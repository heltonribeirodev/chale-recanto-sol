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
header('Cache-Control: public, max-age=3600'); // cache de 1h

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
        // Cole seu link iCal do Airbnb abaixo (substitui as datas manuais automaticamente):
        'ical_url' => '',
        // Exemplo de teste com feriados BR como "indisponíveis":
        // 'ical_url' => 'https://calendar.google.com/calendar/ical/en.brazilian%23holiday%40group.v.calendar.google.com/public/basic.ics',
    ],
    'bosque' => [
        'nome'     => 'Chalé Recanto do Bosque',
        'ical_url' => '',
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
    $ctx = stream_context_create(['http' => ['timeout' => 8]]);
    $raw = @file_get_contents($url, false, $ctx);
    if (!$raw) return [];

    $blocked = [];
    // Extrai blocos VEVENT
    preg_match_all('/BEGIN:VEVENT(.*?)END:VEVENT/s', $raw, $events);
    foreach ($events[1] as $ev) {
        // Pega DTSTART e DTEND (pode ter ;TZID=... ou não)
        preg_match('/DTSTART[^:]*:([\d]+)/', $ev, $start);
        preg_match('/DTEND[^:]*:([\d]+)/', $ev, $end);
        if (!$start || !$end) continue;

        $s = DateTime::createFromFormat('Ymd', substr($start[1], 0, 8));
        $e = DateTime::createFromFormat('Ymd', substr($end[1], 0, 8));
        if (!$s || !$e) continue;

        // Itera cada dia do evento (check-out não é bloqueado, apenas check-in até dia anterior)
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