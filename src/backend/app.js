// Importing node modules and configuring they;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importing controllers;
const researcherController = require('./app-source/controllers/researcherController.js');
const protocolCreationController = require('./app-source/controllers/protocolCreationController.js');
const collectorController = require('./app-source/controllers/collectorController.js');
const protocolDataController = require('./app-source/controllers/protocolDataController.js');
const loginRegisterController = require('./app-source/controllers/loginRegisterController.js');
const isOnlineController = require('./app-source/controllers/isOnlineController.js');
const dinamicProtocolsIdController = require('./app-source/controllers/dinamicProtocolsIdController.js');

// Serving static files
const staticDirs = ['img', 'css', 'js'];
staticDirs.forEach(dir => {
    app.use(express.static(`./frontend/public/${dir}`));
});

// Analisar o corpo da requisição
app.use(express.urlencoded({ extended: false }))

// ENDPOINTS //

// Main endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..' + '/frontend/views/main/index.html'));
});

// login / register endpoints;
app.get('/registerPage', loginRegisterController.getRegisterPage);
app.post('/registering', loginRegisterController.registering);
app.post('/logging', loginRegisterController.logging);

// Researchers endpoints;
app.get('/home_researcher', researcherController.getHome);
app.get('/createProtocol', researcherController.getCreateProtocol);
app.get('/researcher_profile', researcherController.getResearcherProfile);
app.get('/notificationsResearchers', researcherController.getNotificationsPage);
app.get('/researcherProtocolsProgress', researcherController.getProtocolsInProgress);
app.get('/researcherProtocolsFinished', researcherController.getProtocolsFinished);

// Endpoints to show dinamically protocol data;
app.get('/protocols/:id', dinamicProtocolsIdController.dinamicProtocolId);
app.get('/protocolsFinished/:id', dinamicProtocolsIdController.dinamicProtocolFinishedId);

// Colectors endpoints;
app.get('/home_collector', collectorController.getHome);
app.get('/collectorProtocol', collectorController.protocolGenerationPage);
app.get('/collector_profile', collectorController.getCollectorProfile);
app.get('/notificationsCollectors', collectorController.getCollectorNotifications);

// Colectors html
app.get('/colectorProtocol', collectorController.protocolGenerationPage);

// Protocol creation (sending all the protocol to the database);
app.post('/create-protocols', protocolCreationController.creatingProtocol);
app.post('/create-samples', protocolCreationController.creatingSamples);
app.post('/create-steps', protocolCreationController.creatingSteps);
app.post('/create-fields', protocolCreationController.creatingFields);

// Reading protocol data;
app.get('/read_id-protocols', protocolDataController.getProtocolId);
app.get('/read_protocol-data', protocolDataController.getAllProtocolData);
app.get('/read_protocols-progress', protocolDataController.getProtocolsInProgress);
app.get('/read_protocols-finished', protocolDataController.getProtocolsFinished);

// Reading { samples, steps, field } data;
app.post('/read_samples', protocolDataController.getSamplesWithId);
app.post('/read_steps', protocolDataController.getStepWithId);
app.post('/read_field', protocolDataController.getFieldWithId);

// Updating input data
app.post('/updateFields', protocolDataController.updateFields);

// Updating status_protocol to "finished";
app.post('/updateStatus', protocolDataController.updateStatus);

// Route to check the internet connection;
app.get('/isConnected', isOnlineController.checkOnlineStatus);

// Server listening
app.listen(1234, function(){
    console.log("Servidor rodando na URL: http://localhost:1234");
});
