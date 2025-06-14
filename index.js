const express = require('express');
const https = require('https');
const http = require('http');

const app = express();

const BACKEND_URL = 'https://thuetool-online.onrender.com/api/v1/ping/ping';
const PORT = process.env.PORT || 3000;

function pingTargets() {
  // Ping backend
  https.get(BACKEND_URL, (res) => {
    console.log(`[PING] Backend ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`[PING] Backend failed: ${err.message}`);
  });

  // Ping self (dùng đúng PORT thực tế)
  http.get(`http://localhost:${PORT}`, (res) => {
    console.log(`[PING] Self ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`[PING] Self failed: ${err.message}`);
  });
}

pingTargets();
setInterval(pingTargets, 5 * 60 * 1000);

app.get('/', (_, res) => {
  res.send('✅ Keepalive service is running');
});

app.listen(PORT, () => {
  console.log(`✅ Keepalive service started on port ${PORT}`);
});
