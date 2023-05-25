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

// Criando as rotas para interagir com a feature de criação de protocolos:

    let id_protocol;

    // C - Protocols
    app.post('/create-protocols', (req, res) => {
        const { name_protocol, objective_protocol } = req.body;
        db.run(`INSERT INTO tbl_protocols (name_protocol, objective_protocol) VALUES (?, ?)`, [ name_protocol, objective_protocol ], function(err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Error creating protocol.');
            };
            id_protocol = this.lastID;
        });
    });

    // R - Protocols - [id]
    app.get('/read_id-protocols', (req, res) => {
        db.get(`SELECT last_insert_rowid() AS lastId from tbl_protocols`, (err, row) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error reading protocols');
                return;
            }
            const id_protocol = row.lastId;
            res.json({ id_protocol });
        });
        // Faz essa rota pegar imediatamente o ID do último elemento criado
        // Chama essa rota imediatamente após criar o formulário e envia essa informação direto pra um ajax
        // Depois o ajax manda essa informação direto para o create samples
        // Vai ter que ter esse mesmo esquema para os outros
    });

    // C - Samples
    app.post('/create-samples', (req, res) => {
        const { name_sample, description_sample, id_protocol } = req.body;
        db.run(`INSERT INTO tbl_samples (name_sample, description_sample, id_protocol) VALUES (?, ?, ?)`, [ name_sample, description_sample, id_protocol ], function(err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Error creating sample.');
            };
        });
    });

    // C - Steps
    app.post('/create-steps', (req, res) => {
        const name_step = req.body.name_step;
        const description_step = req.body.description_step;
        db.run(`INSERT INTO tbl_steps (name_step, description_step) VALUES (?, ?)`, [ name_step, description_step ], function(err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Error creating steps.');
            };
        });
    });

    // C - Fields
    app.post('/create-fields', (req, res) => {
        const name_field = req.body.name_field;
        const description_field = req.body.description_field;
        db.run(`INSERT INTO tbl_fields (name_field, description_field) VALUES (?, ?)`, [ name_field, description_field ], function(err) {
            if (err) {
                console.error(err);
                return res.status(500).send('Error creating fields.');
            };
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
