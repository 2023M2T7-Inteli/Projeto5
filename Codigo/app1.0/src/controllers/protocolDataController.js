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
            objective: row.objective_protocol
        };
        res.json(protocolData);
    });
}

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
    })
}

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
        
    })
}

function isObject(variable) {
    return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
  }


// Exporting modularized functions;
module.exports = {
    getProtocolId,
    getAllProtocolData,
    getSamplesWithId,
    getStepWithId,
    getFieldWithId,
};