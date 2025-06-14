// ping-worker.js
const https = require('https');

function pingServer() {
  https.get('https://thuetool-online.onrender.com/api/ping', (res) => {
    console.log(`[${new Date().toISOString()}] Ping status: ${res.statusCode}`);
  }).on('error', (e) => {
    console.error(`Ping failed: ${e.message}`);
  });
}

setInterval(pingServer, 5 * 60 * 1000); // mỗi 5 phút
pingServer(); // ping lần đầu khi khởi động
