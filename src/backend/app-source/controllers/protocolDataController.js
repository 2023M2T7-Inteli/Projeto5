// Importing node modules;
const db = require('../../../data/db');

// Function to get the last inserted protocol ID
function getProtocolId(req, res) {
    // Retrieve the last inserted row ID from tbl_protocols table
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

// Function to get all data of the last inserted protocol
function getAllProtocolData(req, res) {
    // Retrieve the data of the last inserted protocol from tbl_protocols table
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
};

// Function to get protocols in progress
function getProtocolsInProgress(req, res) {
    // Retrieve the data of protocols in progress from tbl_protocols table
    db.all(`SELECT * FROM tbl_protocols WHERE status_protocol = "in_progress" ORDER BY id_protocol DESC`, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading protocols data');
            return;
        }

        const protocolData = rows.map(row => ({
            id: row.id_protocol,
            name: row.name_protocol,
            objective: row.objective_protocol,
            coverImage: row.coverImage_protocol,
        }));
        
        console.log(protocolData);
        res.json(protocolData);
    });
};

// Function to get finished protocols
function getProtocolsFinished(req, res) {
    // Retrieve the data of finished protocols from tbl_protocols table
    db.all(`SELECT * FROM tbl_protocols WHERE status_protocol = "finished" ORDER BY id_protocol DESC`, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading protocols data');
            return;
        }

        const protocolData = rows.map(row => ({
            id: row.id_protocol,
            name: row.name_protocol,
            objective: row.objective_protocol,
            coverImage: row.coverImage_protocol,
        }));
        
        console.log(protocolData);
        res.json(protocolData);
    });
};

// Function to get samples with a specific protocol ID
function getSamplesWithId(req, res) {
    // Retrieve the samples data associated with a specific protocol ID from tbl_samples table
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
    });
};

// Function to get steps with a specific sample ID
function getStepWithId(req, res) {
    // Retrieve the steps data associated with a specific sample ID from tbl_steps table
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

// Function to get fields with a specific step ID
function getFieldWithId(req, res) {
    // Retrieve the fields data associated with a specific step ID from tbl_fields table
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

// Function to update fields
function updateFields(req, res) {
    // Update the answer field in the tbl_fields table for a specific field ID
    db.run('UPDATE tbl_fields SET answer_field = ? WHERE id_field = ?', [req.body.answer, req.body.id_field], (err, row) => {
        if (err) {
            res.status(500).send('Error updating database');
        } else {
            res.status(200).send('Update performed successfully');
        }
    });
};

// Function to update the status of a protocol
function updateStatus(req, res) {
    // Update the status of a protocol to "finished" in tbl_protocols table
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


// Helper function to check if a variable is an object
function isObject(variable) {
    return typeof variable === 'object' && variable !== null && !Array.isArray(variable);
};

// Export the modularized functions
module.exports = {
    getProtocolId,
    getAllProtocolData,
    getSamplesWithId,
    getStepWithId,
    getFieldWithId,
    getProtocolsInProgress,
    getProtocolsFinished,
    updateFields,
    updateStatus,
};
