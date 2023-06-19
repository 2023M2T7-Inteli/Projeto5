// Importing node modules;
const db = require('../../db');

// Protocol "getting" - (Getting information from protocols) // 

function getProtocolId(req, res) {
    // R - Protocols - [id];
    db.get(`SELECT last_insert_rowid() AS lastId from tbl_protocols`, (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading protocols');
            return;
        }
        const id_protocol = row.lastId;
        res.json({ id_protocol });
    });
}

function getAllProtocolData(req, res) {
    // Getting the data to create the protocol table;
    db.get(`SELECT * FROM tbl_protocols ORDER BY id_protocol DESC LIMIT 1`, (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading protocols data');
            return;
        }

        const protocolData = {
            id: row.id_protocol,
            name: row.name_protocol,
        };
        res.json(protocolData);
    });
}

<<<<<<< Updated upstream
=======
function getProtocolsInProgress(req, res) {
    // Getting the data to create the protocol table;
    db.all(`SELECT * FROM tbl_protocols WHERE status_protocol = "in_progress"`, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading protocols data');
            return;
        }

        const protocolData = rows.map(row => ({
            id: row.id_protocol,
            name: row.name_protocol,
            objective: row.objective_protocol
        }));
        
        console.log(protocolData);
        res.json(protocolData);
    });
};

function getProtocolsFinished(req, res) {
    // Getting the data to create the protocol table;
    db.all(`SELECT * FROM tbl_protocols WHERE status_protocol = "finished"`, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading protocols data');
            return;
        }

        const protocolData = rows.map(row => ({
            id: row.id_protocol,
            name: row.name_protocol,
            objective: row.objective_protocol
        }));
        
        console.log(protocolData);
        res.json(protocolData);
    });
};

function getSamplesWithId(req, res) {
    // Getting the data to create the samples table
    db.all(`SELECT * FROM tbl_samples WHERE id_protocol=?`, [req.body.id_protocol], (err, row) => {
        if (err) {
            console.log(req.body);
            console.log(err);
            res.status(500).send('Error reading protocols data');
            return;
        }
        if (!row) {
            res.status(500).send('Sample not found');
            return;
        }
        console.log(row);
        if (isObject(row)) {
            let list = [row];
            res.json(list);
        } else {
            res.json(row);
        }
    })
}

function getStepWithId(req, res) {
    // Getting the data to create the samples table
    db.all(`SELECT * FROM tbl_steps WHERE id_sample=?`, [req.body.id_sample], (err, row) => {
        if (err) {
            console.log(req.body);
            console.log(err);
            res.status(500).send('Error reading protocols data');
            return;
        }
        if (!row) {
            res.status(500).send('Sample not found');
            return;
        }
        console.log('--------------------')
        console.log(row);
        if (isObject(row)) {
            let list = [row];
            res.json(list);
            console.log('É objeto');
        } else {
            console.log(row);
            res.json(row);
        }
    });
};

function getFieldWithId(req, res) {
    // Getting the data to create the samples table
    db.all(`SELECT * FROM tbl_fields WHERE id_step=?`, [req.body.id_step], (err, row) => {
        if (err) {
            console.log(req.body);
            console.log(err);
            res.status(500).send('Error reading protocols data');
            return;
        }
        if (!row) {
            res.status(500).send('Sample not found');
            return;
        }
        if (isObject(row)) {
            let list = [row];
            res.json(list);
        } else {
            res.json(row);
        }
    });
};

function updateFields(req, res) {
    // Getting the data to create the samples table
    db.run('UPDATE tbl_fields SET answer_field = ? WHERE id_field = ?', [req.body.answer, req.body.id_field], (err, row) => {
        if (err) {
            res.status(500).send('Error updating database');
        } else {
            res.status(200).send('Update performed successfully');
        }
    });
};

function updateStatus(req, res) {
    // Updating status protocol to "finished"
    const id_protocol = req.body.id_protocol;
    console.log(id_protocol);
    const finished_status = "finished";
    db.run('UPDATE tbl_protocols SET status_protocol = ? WHERE id_protocol = ?', [finished_status, id_protocol], (err, row) => {
        if (err) {
            res.status(500).send('Error updating status');
        } else {
            res.status(200).send('Update performed successfully');
        }
    });
};


function isObject(variable) {
    return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
};

>>>>>>> Stashed changes

// Exporting modularized functions;
module.exports = {
    getProtocolId,
<<<<<<< Updated upstream
    getAllProtocolData
=======
    getAllProtocolData,
    getSamplesWithId,
    getStepWithId,
    getFieldWithId,
    getProtocolsInProgress,
    getProtocolsFinished,
    updateFields,
    updateStatus,
>>>>>>> Stashed changes
};