// Importing node modules;
const path = require('path');

// Collectors endpoints //

// Collectors homepage; ...
function getHome(req, res) {
    res.sendFile(path.join(__dirname, '..', '..' + '/views/produtor/home_produtor.html'));
};

// Collectors profile; ...
function getCollectorProfile(req, res) {
    res.sendFile(path.join(__dirname, '..', '..' + '/views/produtor/perfil_produtor.html'));
}

// Collectors page to see protocols (still developing this); ...
function protocolGenerationPage(req, res) {
    res.sendFile(path.join(__dirname, '..', '..' + '/views/produtor/colectorProtocol.html'));
};

// Exporting modularized functions;
module.exports = {
    getHome,
    getCollectorProfile,
    protocolGenerationPage
};
