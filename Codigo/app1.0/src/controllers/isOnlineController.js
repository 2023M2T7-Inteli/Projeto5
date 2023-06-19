const dns = require('dns');

function hasInternetConnection() {
  return new Promise(resolve => {
    dns.lookup('google.com', err => {
      if (err && err.code === 'ENOTFOUND') {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

// Exemplo de uso:
async function checkOnlineStatus(req, res) {
  const isConnected = await hasInternetConnection();
  if (isConnected) {
    console.log("Connected!");
    res.status(200).json({ isConnected: true });
  } else {
    console.log("Disconnected!");
    res.status(500).json({ isConnected: false });
    setInterval(() => {
      if (navigator.onLine) {
        console.log("Reconnected");
        location.reload();
      } else {
        console.log("Still Disconnected");
      }
    }, 5000);
  }
};

module.exports = {
    checkOnlineStatus
};
