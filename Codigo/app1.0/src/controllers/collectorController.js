// Importing node modules;
const path = require('path');

// Collectors endpoints //

// Collectors homepage; ...

// Collectors profile; ...

// Collectors page to see protocols (still developing this); ...
function protocolGenerationPage(req, res) {
    res.sendFile(path.join(__dirname, '..', '..' + '/views/produtor/colectorProtocol.html'));
};

// Exporting modularized functions;
module.exports = {
    protocolGenerationPage
};
