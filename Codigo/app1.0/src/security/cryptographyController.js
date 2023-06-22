const crypto = require("crypto-js");

// Windows: set ENCRYPTION_KEY=MinhaChaveDeCriptografia
// const encryptionKey = process.env.ENCRYPTION_KEY;

// Data cryptography functions

// encryptionKey to define the "encrypt data rule";
const encryptionKey = "apotichEncryptionKey";

// Function to encrypt the data;
function crypt(data) {
    const encryptedData = crypto.AES.encrypt(data, encryptionKey).toString();
    return encryptedData;
};

// Function to decrypt the data;
function decrypt(encryptedData) {
    const decryptedData = crypto.AES.decrypt(encryptedData, encryptionKey).toString(crypto.enc.Utf8);
    return decryptedData;
};

// Exporting modularized functions;
module.exports = {
    crypt,
    decrypt
};
