// Importing node modules and configuring they;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

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

// Working on this feature
    app.get('/protocols/:id', (req, res) => {
        const protocolId = req.params.id;

        db.get('SELECT * FROM tbl_protocols WHERE id_protocol = ?', [protocolId], (err, row) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error getting info from db');
            } else {
                if (row) {
                    fs.readFile(path.join(__dirname + '/views/produtor/listingProtocols.html'), 'utf8', (err, data) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send('Error reading HTML file');
                        } else {
                            const modifiedHTML = data
                                .replace('{{id_protocol}}', row.id_protocol)
                                .replace('{{name_protocol}}', row.name_protocol)
                                .replace('{{objective_protocol}}', row.objective_protocol);
                            res.set('Content-Type', 'text/html');
                            res.send(modifiedHTML);
                            // fs.writeFile(path.join(__dirname + '/views/produtor/listingProtocols.html'), modifiedHTML, (err) => {
                            //     if (err) throw err;

                            //     res.sendFile(path.join(__dirname + '/views/produtor/listingProtocols.html'));
                            // });
                        }
                    });
                } else {
                    res.status(404).send('Protocol not found');
                }
            }
        });
    });
//

// Colectors endpoints;
app.get('/home_collector', collectorController.getHome);
app.get('/collectorProtocol', collectorController.protocolGenerationPage);
app.get('/collector_profile', collectorController.getCollectorProfile);

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
