// Importing node modules;
const path = require('path');

// Researchers endpoints //

// Researchers homepage;
function getHome(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..' + '/frontend/views/researcher/home_researcher.html'));
};

// Page for creating protocols;
function getCreateProtocol(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..' + '/frontend/views/researcher/createProtocol.html'));
};

// Researcher profile page;
function getResearcherProfile(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..' + '/frontend/views/researcher/researcher_profile.html'));
};

// Researcher notifications page;
function getNotificationsPage(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..' + '/frontend/views/researcher/notificacao_pesquisador.html'));
};

// Page to see the protocols that are in progress;
function getProtocolsInProgress(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..' + '/frontend/views/researcher/researcherProtocolsProgress.html'))
};

// Page to see the finished protocols;
function getProtocolsFinished(req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..' + '/frontend/views/researcher/researcherProtocolsFinished.html'))
};

// Exporting modularized functions;
module.exports = {
    getHome,
    getCreateProtocol,
    getResearcherProfile,
    getResearcherProfile,
    getNotificationsPage,
    getProtocolsInProgress,
    getProtocolsFinished,
};