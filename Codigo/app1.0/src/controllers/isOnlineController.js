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
    console.log("De fato, tem conexão!")
  } else {
    console.log("Sem conexão")
  }
};

module.exports = {
    checkOnlineStatus
};
