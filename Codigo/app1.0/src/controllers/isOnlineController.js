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
async function checkOnlineStatus() {
  const isConnected = await hasInternetConnection();
  if (isConnected) {
    console.log("Connected!");
    return true;
  } else {
    console.log("Disconnected!");
    return false;
  }
};

module.exports = {
    checkOnlineStatus
};
