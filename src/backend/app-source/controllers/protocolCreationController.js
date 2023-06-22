// Importing node modules;
const db = require('../../../data/db');

// Function to create a new protocol (Researcher is creating a protocol)
function creatingProtocol(req, res) {
    // Extract data from the request body
    const { name_protocol, objective_protocol, startDate_protocol, endDate_protocol, coverImage_protocol } = req.body;
    const status_protocol = "in_progress";

    // Insert the protocol data into the tbl_protocols table
    db.run(`INSERT INTO tbl_protocols (name_protocol, objective_protocol, startDate_protocol, endDate_protocol, status_protocol, coverImage_protocol) VALUES (?,?,?,?,?,?)`, [ name_protocol, objective_protocol, startDate_protocol, endDate_protocol, status_protocol, coverImage_protocol ], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating protocol.');
        };
        return res.status(200).send("Olá!");
    });
};

// Function to create a new sample
function creatingSamples(req, res) {
    // Extract data from the request body
    const { name_sample, description_sample, id_protocol } = req.body;

    // Insert the sample data into the tbl_samples table
    db.run(`INSERT INTO tbl_samples (name_sample, description_sample, id_protocol) VALUES (?, ?, ?)`, [ name_sample, description_sample, id_protocol ], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating sample.');
        };
        const id = this.lastID;
        console.log("Cheguei aqui: Sample!");
        res.send({ id_sample: id });
    });
};

// Function to create a new step
function creatingSteps(req, res) {
    // Extract data from the request body
    const { name_step, description_step, id_sample } = req.body;

    // Insert the step data into the tbl_steps table
    db.run(`INSERT INTO tbl_steps (name_step, description_step, id_sample) VALUES (?, ?, ?)`, [ name_step, description_step, id_sample ], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating steps.');
        };
        const id = this.lastID;
        console.log("Cheguei aqui: Step!");
        res.send({ id_step: id });
    });
};

// Function to create a new field
function creatingFields(req, res) {
    // Extract data from the request body
    const { name_field, description_field, id_step } = req.body;

    // Insert the field data into the tbl_fields table
    db.run(`INSERT INTO tbl_fields (name_field, description_field, id_step) VALUES (?, ?, ?)`, [ name_field, description_field, id_step ], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating fields.');
        };
        const id = this.lastID;
        console.log("Cheguei aqui: Field!");
        res.send({ id_field: id });
    });
};

// Export the modularized functions
module.exports = {
    creatingProtocol,
    creatingSamples,
    creatingSteps,
    creatingFields
};
