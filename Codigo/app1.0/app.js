// Importing node modules and configuring they;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importing built-in modules;
const db = require('./db.js');

// Importing controllers;
const researcherController = require('./src/controllers/researcherController.js');
const protocolCreationController = require('./src/controllers/protocolCreationController.js');
const collectorController = require('./src/controllers/collectorController.js');
const protocolDataController = require('./src/controllers/protocolDataController.js');
const loginRegisterController = require('./src/controllers/loginRegisterController.js');
const isOnlineController = require('./src/controllers/isOnlineController.js');

// Serving static files
const staticDirs = ['img', 'css', 'js'];
staticDirs.forEach(dir => {
    app.use(express.static(`./public/${dir}`));
});

// Analisar o corpo da requisição
app.use(express.urlencoded({ extended: false }))

// ENDPOINTS //

// Main endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/main/index.html'));
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

// Reading { samples, steps, field } data;
app.post('/read_samples', protocolDataController.getSamplesWithId);
app.post('/read_steps', protocolDataController.getStepWithId);
app.post('/read_field', protocolDataController.getFieldWithId);

// Updating input data
app.post('/updateFields', protocolDataController.updateFields);

// Route to check the internet connection
app.get('/isConnected', isOnlineController.checkOnlineStatus);

// Server listening
app.listen(8081, function(){
    console.log("Servidor rodando na URL: http://localhost:8081");
});
