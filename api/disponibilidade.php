<?php
/**
 * API de Disponibilidade — Recanto do Sol Chalés
 * ------------------------------------------------
 * Retorna datas indisponíveis para cada chalé via iCal do Airbnb.
 * Suporta status: "disponivel" | "indisponivel" | "preparo"
 *
 * Uso: GET /api/disponibilidade.php?chale=sol&meses=3&preparo=1
 *
 * COMO ATUALIZAR OS LINKS iCAL:
 *   1. Airbnb → Anúncios → clique no anúncio
 *   2. Disponibilidade → Sincronizar calendários → Exportar calendário
 *   3. Cole o link novo abaixo em 'ical_url'
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

// ── Configuração dos Chalés ──────────────────────────────────────────────────
$CHALES = [
    'sol' => [
        'nome'     => 'Chalé Pôr do Sol',
        'ical_url' => 'https://www.airbnb.com/calendar/ical/1211468186262258138.ics?t=914d55280d484d679b95aa0fb0625a2c',
    ],
    'bosque' => [
        'nome'     => 'Chalé Recanto do Bosque',
        'ical_url' => 'https://www.airbnb.com/calendar/ical/1277477003441238955.ics?t=7c057740bdbc41acb371c22e99a2209a',
    ],
];

// ── Dias de preparo (limpeza) antes de cada check-in ─────────────────────────
// 0 = sem preparo | 1 = 1 dia de limpeza (padrão Airbnb)
define('DIAS_PREPARO', 1);

// ── Parâmetros da requisição ──────────────────────────────────────────────────
$chaleKey = $_GET['chale'] ?? 'sol';
$meses    = min((int)($_GET['meses'] ?? 3), 12);

if (!isset($CHALES[$chaleKey])) {
    http_response_code(400);
    echo json_encode(['erro' => 'Chalé inválido. Use: sol ou bosque']);
    exit;
}

// ── Função: faz o parse do arquivo .ics ──────────────────────────────────────
// Retorna array com:
//   'bloqueadas' => datas ocupadas por hóspedes
//   'checkins'   => datas de check-in (para calcular preparo)
function parseIcal(string $url): array
{
    $ctx = stream_context_create(['http' => ['timeout' => 15]]);
    $raw = @file_get_contents($url, false, $ctx);

    if (!$raw) {
        return ['bloqueadas' => [], 'checkins' => []];
    }

    // Normaliza quebras de linha e faz unfold de linhas longas
    $raw = str_replace("\r\n", "\n", $raw);
    $raw = preg_replace('/\n[ \t]/', '', $raw);

    $bloqueadas = [];
    $checkins   = [];

    preg_match_all('/BEGIN:VEVENT(.*?)END:VEVENT/si', $raw, $events);

    foreach ($events[1] as $ev) {

        // Ignora reservas canceladas
        if (stripos($ev, 'STATUS:CANCELLED') !== false) {
            continue;
        }

        // Captura DTSTART e DTEND
        preg_match('/DTSTART(?:;[^:]*)?:([^\r\n]+)/i', $ev, $start);
        preg_match('/DTEND(?:;[^:]*)?:([^\r\n]+)/i',   $ev, $end);

        if (empty($start[1]) || empty($end[1])) {
            continue;
        }

        // Extrai apenas os 8 dígitos da data (YYYYMMDD)
        $startDate = substr(preg_replace('/\D/', '', trim($start[1])), 0, 8);
        $endDate   = substr(preg_replace('/\D/', '', trim($end[1])),   0, 8);

        if (strlen($startDate) < 8 || strlen($endDate) < 8) {
            continue;
        }

        $s = DateTime::createFromFormat('Ymd', $startDate);
        $e = DateTime::createFromFormat('Ymd', $endDate);

        if (!$s || !$e || $s >= $e) {
            continue;
        }

        // Salva data de check-in para calcular preparo depois
        $checkins[] = $s->format('Y-m-d');

        // Bloqueia do check-in até o dia anterior ao check-out
        $cur = clone $s;
        while ($cur < $e) {
            $bloqueadas[] = $cur->format('Y-m-d');
            $cur->modify('+1 day');
        }
    }

    return [
        'bloqueadas' => array_values(array_unique($bloqueadas)),
        'checkins'   => array_values(array_unique($checkins)),
    ];
}

// ── Função: iCal com cache em arquivo (1 hora) ────────────────────────────────
function parseIcalComCache(string $url, string $chave): array
{
    $arquivo  = sys_get_temp_dir() . "/ical_recanto_{$chave}.json";
    $maxIdade = 3600;

    if (file_exists($arquivo) && (time() - filemtime($arquivo)) < $maxIdade) {
        $dados = json_decode(file_get_contents($arquivo), true);
        if (!empty($dados['bloqueadas'])) {
            return $dados;
        }
    }

    $resultado = parseIcal($url);

    if (!empty($resultado['bloqueadas'])) {
        file_put_contents($arquivo, json_encode($resultado));
        return $resultado;
    }

    if (file_exists($arquivo)) {
        $dados = json_decode(file_get_contents($arquivo), true);
        return is_array($dados) ? $dados : ['bloqueadas' => [], 'checkins' => []];
    }

    return ['bloqueadas' => [], 'checkins' => []];
}

// ── Busca datas do iCal ───────────────────────────────────────────────────────
$chaleCfg = $CHALES[$chaleKey];
$icalData = parseIcalComCache($chaleCfg['ical_url'], $chaleKey);

$bloqueadas = $icalData['bloqueadas'];
$checkins   = $icalData['checkins'];

// ── Calcula dias de preparo ───────────────────────────────────────────────────
// Para cada check-in, bloqueia os N dias anteriores como "preparo"
$diasPreparo = [];

if (DIAS_PREPARO > 0) {
    foreach ($checkins as $checkin) {
        for ($i = 1; $i <= DIAS_PREPARO; $i++) {
            $d = new DateTime($checkin);
            $d->modify("-{$i} day");
            $prepDia = $d->format('Y-m-d');

            // Só marca como preparo se não for já uma data bloqueada por hóspede
            if (!in_array($prepDia, $bloqueadas)) {
                $diasPreparo[] = $prepDia;
            }
        }
    }
    $diasPreparo = array_unique($diasPreparo);
}

// ── Monta resposta ────────────────────────────────────────────────────────────
$hoje = new DateTime('today');
$fim  = (clone $hoje)->modify("+{$meses} months");

$resultado = [];
$cur = clone $hoje;

while ($cur <= $fim) {
    $iso = $cur->format('Y-m-d');

    if (in_array($iso, $bloqueadas)) {
        $status = 'indisponivel';
    } elseif (in_array($iso, $diasPreparo)) {
        $status = 'preparo';     // bloqueado para limpeza — igual ao cinza do Airbnb
    } else {
        $status = 'disponivel';
    }

    $resultado[$iso] = $status;
    $cur->modify('+1 day');
}

echo json_encode([
    'chale'        => $chaleKey,
    'nome'         => $chaleCfg['nome'],
    'gerado_em'    => date('c'),
    'fonte'        => 'airbnb_ical',
    'dias_preparo' => DIAS_PREPARO,
    'datas'        => $resultado,
], JSON_PRETTY_PRINT);