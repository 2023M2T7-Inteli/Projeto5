const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db.js');

const app = express();

// BodyParser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serving static files
app.use(express.static('./public/img'));
app.use(express.static('./public/css'));
app.use(express.static('./public/js'));

// Endpoints
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

        // 
        app.get('/researcher_profile', (req, res) => {
            res.sendFile(path.join(__dirname + '/views/researcher/researcher_profile.html'))
        });
    //

    // CRUD endpoints
        // CRUD -> R
        app.get('/protocols', (req, res) => {
            db.all("SELECT * FROM protocols", (err, rows) => {
                if (err) {
                    res.status(400).json({"error":err.message});
                    return;
                }
                res.json({
                    "mensagem":"CRUD (R) -> Feito com sucesso!",
                    "dados":rows
                });
            });
        });

        // CRUD -> C
        app.post('/protocols', (req, res) => {
            const { name, objective, collector } = req.body;
        
            db.run(`INSERT INTO protocols (name, objective, collector) VALUES (?, ?, ?)`, [name, objective, collector], function(err) {
            });

            res.redirect('/protocols');
        });

        // CRUD -> D
        app.delete('/protocols/:id', (req, res) => {
            const id = req.params.id;

            db.run(`DELETE FROM protocols WHERE id = ?`, [id], function(err) {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Erro ao excluir protocolo.');
                }
                console.log(`Protocolo com id ${id} excluído com sucesso.`);
                return res.status(204).send();
            });
        });

        // CRUD -> U
        app.get('/editProtocols', (req, res) => {
            res.sendFile(path.join(__dirname + "/views/researcher/editProtocol.html"));
        });
          
        app.get('/editProtocols/updateValues', (req, res) => {
            const id = req.query.id;
            const name = req.query.name;
            const objective = req.query.objective;
            const collector = req.query.collector;
          
            db.run('UPDATE protocols SET name = ?, objective = ?, collector = ? WHERE id = ?', [
                name, 
                objective, 
                collector, 
                id
            ]);
            
            res.redirect('/protocols');
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
//

// Server listening
app.listen(8081, function(){
    console.log("Servidor rodando na URL: http://localhost:8081");
});
