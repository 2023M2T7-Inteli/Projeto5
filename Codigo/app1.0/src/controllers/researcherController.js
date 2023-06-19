// Importing node modules;
const path = require('path');

// Researchers endpoints //

// Researchers homepage;
function getHome(req, res) {
    res.sendFile(path.join(__dirname, '..', '..' + '/views/researcher/home_researcher.html'));
};

// Page for creating protocols;
function getCreateProtocol(req, res) {
    res.sendFile(path.join(__dirname, '..', '..' + '/views/researcher/createProtocol.html'));
};

// Researcher profile page;
function getResearcherProfile(req, res) {
    res.sendFile(path.join(__dirname, '..', '..' + '/views/researcher/researcher_profile.html'));
};

function getNotificationsPage(req, res) {
    res.sendFile(path.join(__dirname, '..', '..' + '/views/researcher/notificacao_pesquisador.html'));
};

function getProtocolsInProgress(req, res) {
    res.sendFile(path.join(__dirname, '..', '..' + '/views/researcher/researcherProtocolsProgress.html'))
};

function getProtocolsFinished(req, res) {
    res.sendFile(path.join(__dirname, '..', '..' + '/views/researcher/researcherProtocolsFinished.html'))
};

// Exporting modularized functions;
module.exports = {
    getHome,
    getCreateProtocol,
    getResearcherProfile,
    getNotificationsPage,
    getProtocolsInProgress,
    getProtocolsFinished,
};