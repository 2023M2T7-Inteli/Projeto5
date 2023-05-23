// Importing node modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Importing built-in modules
const db = require('./db.js');
const protocols = require('./src/routes/protocols');

// Defining instances of frameworks
const app = express();

// BodyParser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serving static files
const staticDirs = ['img', 'css', 'js'];
staticDirs.forEach(dir => {
    app.use(express.static(`./public/${dir}`));
});

//////// ENDPOINTS ////////

// Main endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/main/index.html'));
});

// Researchers endpoints
    // index.html --> home_researcher.html
    app.get('/home_researcher', (req, res) => {
        res.sendFile(path.join(__dirname + '/views/researcher/home_researcher.html'))
    });

    // home_researcher.html --> new_protocol.html
    app.get('/new_protocols', (req, res) => {
        res.sendFile(path.join(__dirname + '/views/researcher/new_protocols.html'))
    });

    // Working......................................................................
    app.get('/createProtocol', (req, res) => {
        res.sendFile(path.join(__dirname + '/views/researcher/createProtocol.html'))
    });

    // home_researcher.html --> researcher_profile.html
    app.get('/researcher_profile', (req, res) => {
        res.sendFile(path.join(__dirname + '/views/researcher/researcher_profile.html'))
    });
//

// CRUD endpoints
    // CRUD -> R
    app.get('/protocols', (req, res) => {
        protocols.read(db, (err, rows) => {
            if (err){
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                mensagem: "CRUD (R) - Feito com sucesso!",
                dados: rows,
            });
        });
    });

    // CRUD -> C
    app.post('/protocols', (req, res) => {
        const data = req.body;
        protocols.create(db, data, (err, lastID) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send("Erro ao criar protocolo");
            }
            res.redirect('/protocols');
        });
    });

    // CRUD -> D
    app.delete('/protocols/:id', (req, res) => {
        const id = req.params.id;
        protocols.remove(db, id, (err, changes) => {
            if (err) {
                console.error(err.message);
                return res.status(500).send("Erro ao excluir protocolo.");
            }
            console.log(`Protocolo com id ${id} excluído com sucesso.`);
            return res.status(204).send();
        });
    });

    // CRUD -> U
    app.get('/editProtocols', (req, res) => {
        res.sendFile(path.join(__dirname + "/views/researcher/editProtocol.html"));
    });
        
    app.post('/editProtocols/updateValues', (req, res) => {
        const data = {
            id: req.body.id,
            name: req.body.name,
            objective: req.body.objective,
            collector: req.body.collector
        };
        
        protocols.update(db, data, (err, changes) => {
            if (err) {
                res.status(500).send(`Erro ao atualizar os valores.`);
                return;
            }
            res.redirect('/protocols');
        });
    });
//

// JOIN
    app.get('/innerJoin', (req, res) => {
        let protocolId = 3;
        db.all(`SELECT collectors.name_collector
                FROM protocols
                INNER JOIN collectors ON protocols.id = collectors.protocol_id
                WHERE protocols.id = ?`, [protocolId], (err, rows) => {
            if (err) {
                console.error(err.message);
                return;
            }
            res.json({
                "mensagem":"JOIN-> Feito com sucesso!",
                "dados":rows
            });
        });
    });
//


// Server listening
app.listen(8081, function(){
    console.log("Servidor rodando na URL: http://localhost:8081");
});
