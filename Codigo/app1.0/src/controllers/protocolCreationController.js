// Importing node modules;
const db = require('../../db');

// Protocol creation - (Researcher is creating a protocol) // 

function creatingProtocol(req, res) {
    // C - protocols
    const { name_protocol, objective_protocol } = req.body;
    db.run(`INSERT INTO tbl_protocols (name_protocol, objective_protocol) VALUES (?, ?)`, [ name_protocol, objective_protocol ], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating protocol.');
        };
        return res.status(200).send("Olá!");
    });
};

function creatingSamples(req, res) {
    // C - Samples;
    const { name_sample, description_sample, id_protocol } = req.body;
    db.run(`INSERT INTO tbl_samples (name_sample, description_sample, id_protocol) VALUES (?, ?, ?)`, [ name_sample, description_sample, id_protocol ], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating sample.');
        };
    });
};

function creatingSteps(req, res) {
    // C - Steps;
    const name_step = req.body.name_step;
    const description_step = req.body.description_step;
    db.run(`INSERT INTO tbl_steps (name_step, description_step) VALUES (?, ?)`, [ name_step, description_step ], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating steps.');
        };
    });
};

function creatingFields(req, res) {
    // C - Fields;
    const name_field = req.body.name_field;
    const description_field = req.body.description_field;
    db.run(`INSERT INTO tbl_fields (name_field, description_field) VALUES (?, ?)`, [ name_field, description_field ], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating fields.');
        };
    });
};

// Exporting modularized functions;
module.exports = {
    creatingProtocol,
    creatingSamples,
    creatingSteps,
    creatingFields
};