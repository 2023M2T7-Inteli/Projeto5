// Importing node modules;
const path = require('path'); // Module for handling file paths

// Collectors endpoints //

// Collectors homepage; ...
function getHome(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..' + '/frontend/views/produtor/home_collector.html'));
};

// Collectors profile; ...
function getCollectorProfile(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..' + '/frontend/views/produtor/collector_profile.html'));
};

// Collectors page to see protocols (still developing this); ...
function protocolGenerationPage(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..' + '/frontend/views/produtor/colectorProtocol.html'));
};

function getCollectorNotifications(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..' + '/frontend/views/produtor/notificationsCollectors.html'));
}

// Exporting modularized functions;
module.exports = {
    getHome,
    getCollectorProfile,
    protocolGenerationPage,
    getCollectorNotifications
};
