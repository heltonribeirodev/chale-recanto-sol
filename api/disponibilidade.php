<?php
/**
 * API de Disponibilidade — Recanto do Sol Chalés
 * ------------------------------------------------
 * Retorna datas indisponíveis para cada chalé.
 * 
 * PARA INTEGRAR COM AIRBNB (iCal):
 *   1. No Airbnb, vá em: Anúncio → Disponibilidade → Exportar calendário
 *   2. Copie o link .ics gerado
 *   3. Cole na constante ICAL_URL do chalé correspondente abaixo
 *   4. Remova o array $manualDates quando usar iCal
 * 
 * Uso: GET /api/disponibilidade.php?chale=sol&meses=2
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

// ── Configuração dos Chalés ──────────────────────────────────────────────────
//
// COMO PEGAR O LINK iCAL DO AIRBNB:
//   1. Acesse airbnb.com.br → Anúncios → clique no seu anúncio
//   2. Vá em: Disponibilidade → Sincronizar calendários → Exportar calendário
//   3. Copie o link gerado (começa com https://www.airbnb.com.br/calendar/ical/...)
//   4. Cole abaixo em 'ical_url' do chalé correspondente
//
// LINK DE TESTE (Google Calendar público — para validar o parser):
//   https://calendar.google.com/calendar/ical/en.brazilian%23holiday%40group.v.calendar.google.com/public/basic.ics
//   (feriados brasileiros — útil para ver como datas bloqueadas aparecem no calendário)
//
$CHALES = [
    'sol' => [
        'nome'     => 'Chalé Pôr do Sol',
        'ical_url' => 'https://www.airbnb.com/calendar/ical/1277477003441238955.ics?t=7c057740bdbc41acb371c22e99a2209a&locale=pt',
    ],
    'bosque' => [
        'nome'     => 'Chalé Recanto do Bosque',
        'ical_url' => 'https://www.airbnb.com/calendar/ical/1211468186262258138.ics?t=914d55280d484d679b95aa0fb0625a2c&locale=pt',
    ],
];

// ── Datas bloqueadas manuais (use enquanto não tem iCal) ─────────────────────
// Formato: 'YYYY-MM-DD'
$manualDates = [
    'sol' => [
        // Exemplos — apague e coloque as datas reais:
        '2026-09-19', '2026-09-20', '2026-09-21',
        '2026-10-03', '2026-10-04', '2026-10-05',
        '2026-10-10', '2026-10-11',
        '2026-11-14', '2026-11-15',
    ],
    'bosque' => [
        '2026-09-26', '2026-09-27', '2026-09-28',
        '2026-10-17', '2026-10-18', '2026-10-19',
        '2026-11-07', '2026-11-08', '2026-11-09',
    ],
];

// ── Parâmetros da requisição ──────────────────────────────────────────────────
$chaleKey = $_GET['chale'] ?? 'sol';
$meses    = min((int)($_GET['meses'] ?? 3), 12);

if (!isset($CHALES[$chaleKey])) {
    http_response_code(400);
    echo json_encode(['erro' => 'Chalé inválido. Use: sol ou bosque']);
    exit;
}

// ── Função: parse iCal ────────────────────────────────────────────────────────
function parseIcal(string $url): array {
    $ctx = stream_context_create(['http' => ['timeout' => 12]]);
    $raw = @file_get_contents($url, false, $ctx);
    if (!$raw) return [];

    $blocked = [];
    
    // Quebra o texto usando 'is' para ignorar maiúsculas/minúsculas e quebras de linha sujas
    preg_match_all('/BEGIN:VEVENT(.*?)END:VEVENT/is', $raw, $events);
    
    foreach ($events[1] as $ev) {
        // Trava 1: Ignora sumariamente reservas canceladas
        if (stripos($ev, 'STATUS:CANCELLED') !== false) {
            continue;
        }

        // Trava 2: Captura estritamente os 8 dígitos da data (YYYYMMDD)
        // Isso ignora qualquer lixo de fuso horário como "TZID=America/Sao_Paulo" ou horários "T140000Z"
        preg_match('/DTSTART[^:]*:([\d]{8})/', $ev, $start);
        preg_match('/DTEND[^:]*:([\d]{8})/', $ev, $end);
        
        if (empty($start[1]) || empty($end[1])) {
            continue;
        }

        $s = DateTime::createFromFormat('Ymd', $start[1]);
        $e = DateTime::createFromFormat('Ymd', $end[1]);
        
        if (!$s || !$e) continue;

        // Trava 3: Adiciona as datas ao array, mantendo o dia de check-out livre
        $cur = clone $s;
        while ($cur < $e) {
            $blocked[] = $cur->format('Y-m-d');
            $cur->modify('+1 day');
        }
    }
    return array_unique($blocked);
}

// ── Resolve datas bloqueadas ──────────────────────────────────────────────────
$chaleCfg = $CHALES[$chaleKey];
$bloqueadas = [];

if (!empty($chaleCfg['ical_url'])) {
    // Produção: puxa do Airbnb
    $bloqueadas = parseIcal($chaleCfg['ical_url']);
} else {
    // Fallback: datas manuais
    $bloqueadas = $manualDates[$chaleKey] ?? [];
}

// ── Monta resposta com os meses solicitados ───────────────────────────────────
$hoje   = new DateTime('today');
$fim    = (clone $hoje)->modify("+{$meses} months");
$resultado = [];

$cur = clone $hoje;
while ($cur <= $fim) {
    $iso = $cur->format('Y-m-d');
    $resultado[$iso] = in_array($iso, $bloqueadas) ? 'indisponivel' : 'disponivel';
    $cur->modify('+1 day');
}

echo json_encode([
    'chale'      => $chaleKey,
    'nome'       => $chaleCfg['nome'],
    'gerado_em'  => date('c'),
    'fonte'      => !empty($chaleCfg['ical_url']) ? 'airbnb_ical' : 'manual',
    'datas'      => $resultado,
]);