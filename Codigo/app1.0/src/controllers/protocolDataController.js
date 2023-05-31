// Importing node modules;
const db = require('../../db');

// Protocol "getting" - (Getting information from protocols) // 

function getProtocolId(req, res) {
    // R - Protocols - [id];
    db.get(`SELECT * FROM tbl_protocols ORDER BY id_protocol DESC LIMIT 1`, (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading protocols');
            return;
        }
        const id_protocol = row.id_protocol;
        console.log("id_protocol: " + id_protocol)
        res.json({ id_protocol: id_protocol });
    });
};

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


// Exporting modularized functions;
module.exports = {
    getProtocolId,
    getAllProtocolData
};