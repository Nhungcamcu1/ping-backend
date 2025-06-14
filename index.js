const express = require('express');
const https = require('https');
const http = require('http'); // vì chính mình là HTTP

const app = express();
const SELF_URL = 'http://localhost:3000';
const TARGET_URL = 'https://thuetool-online.onrender.com/api/ping';

function pingBackend() {
  https.get(TARGET_URL, res => {
    console.log(`[PING] Backend OK ${res.statusCode}`);
  }).on('error', err => {
    console.error(`[PING] Backend failed: ${err.message}`);
  });

  http.get(SELF_URL, res => {
    console.log(`[PING] Self OK ${res.statusCode}`);
  }).on('error', err => {
    console.error(`[PING] Self failed: ${err.message}`);
  });
}

setInterval(pingBackend, 5 * 60 * 1000); // mỗi 5 phút
pingBackend(); // lần đầu

app.get('/', (_, res) => {
  res.send('✅ Keepalive Web Service đang chạy!');
});

app.listen(3000, () => {
  console.log('✅ Keepalive Web Service khởi động tại cổng 3000');
});
