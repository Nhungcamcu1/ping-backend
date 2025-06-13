// ping.js
import https from 'https';

const URL = 'https://thuetool-online.onrender.com/healthz';

function ping() {
  https.get(URL, res => {
    console.log(new Date().toISOString(), 'Status:', res.statusCode);
  }).on('error', err => {
    console.error(new Date().toISOString(), 'Error:', err.message);
  });
}

// Chạy ngay khi start
ping();

// Không exit, giữ process alive
setInterval(ping, 5 * 60 * 1000);
