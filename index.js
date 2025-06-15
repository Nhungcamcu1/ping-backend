/**
 * SERVICE A
 * - Ping Service B (được chỉ định qua biến PARTNER_URL)
 * - Ping BACKEND_URL (/api/ping) để giữ backend chính sống
 */
const express = require('express');
const https = require('https');
const http = require('http');

const app  = express();
const PORT = process.env.PORT || 3000;

const PARTNER_URL = process.env.PARTNER_URL;            // URL service B (https://service-b.onrender.com)
const BACKEND_URL = process.env.BACKEND_URL;            // https://thuetool-online.onrender.com/api/ping

function ping(url, label) {
  const mod = url.startsWith('https') ? https : http;
  mod.get(url, res => {
    console.log(`[PING ${label}] ${url} → ${res.statusCode}`);
  }).on('error', err => {
    console.error(`[PING ${label}] ${url} failed:`, err.message);
  });
}

function pingLoop() {
  if (PARTNER_URL) ping(PARTNER_URL, 'PARTNER');
  if (BACKEND_URL) ping(BACKEND_URL, 'BACKEND');
}

pingLoop();                               // chạy ngay khi khởi động
setInterval(pingLoop, 10 * 60 * 1000);    // sau đó mỗi 10 phút

app.get('/', (_, res) => res.send('Service A alive'));
app.listen(PORT, () => console.log(`Service A listening on ${PORT}`));
