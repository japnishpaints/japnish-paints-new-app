<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
echo json_encode([
  'version' => '74.0.0',
  'apk_url' => 'https://japnishpaints.store/mobile/app/JapnishPaints.apk',
  'force' => false,
  'notes' => 'Latest Japnish Paints app update.'
], JSON_UNESCAPED_SLASHES);
