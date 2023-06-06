const crypto = require("crypto-js");

// Windows: set ENCRYPTION_KEY=MinhaChaveDeCriptografia
// const encryptionKey = process.env.ENCRYPTION_KEY;

// Data cryptography functions

const encryptionKey = "apotichEncryptionKey";

function crypt(data) {
    const encryptedData = crypto.AES.encrypt(data, encryptionKey).toString();
    return encryptedData;
};

function decrypt(encryptedData) {
    const decryptedData = crypto.AES.decrypt(encryptedData, encryptionKey).toString(crypto.enc.Utf8);
    return decryptedData;
};

module.exports = {
    crypt,
    decrypt
};
