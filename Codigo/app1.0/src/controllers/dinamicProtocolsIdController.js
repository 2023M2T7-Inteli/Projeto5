// Importing node modules;
const db = require('../../db');
const fs = require('fs');
const path = require('path');

function dinamicProtocolId (req, res) {
    const protocolId = req.params.id;

    db.get('SELECT * FROM tbl_protocols WHERE id_protocol = ?', [protocolId], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error getting info from db');
        } else {
            if (row) {
                fs.readFile(path.join(__dirname, '..', '..' + '/views/produtor/listingProtocols.html'), 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Error reading HTML file');
                    } else {
                        const modifiedHTML = data
                            .replace('{{id_protocol}}', row.id_protocol)
                            .replace('{{coverImage_protocol}}', row.coverImage_protocol)
                            .replace('{{name_protocol}}', row.name_protocol)
                            .replace('{{objective_protocol}}', row.objective_protocol);
                        res.set('Content-Type', 'text/html');
                        res.send(modifiedHTML);
                    }
                });
            } else {
                res.status(404).send('Protocol not found');
            }
        }
    });
};

function dinamicProtocolFinishedId (req, res) {
    const protocolId = req.params.id;

    db.get('SELECT * FROM tbl_protocols WHERE id_protocol = ?', [protocolId], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error getting info from db');
        } else {
            if (row) {
                fs.readFile(path.join(__dirname, '..', '..' + '/views/researcher/listingProtocolsFinished.html'), 'utf8', (err, data) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Error reading HTML file');
                    } else {
                        const modifiedHTML = data
                            .replace('{{id_protocol}}', row.id_protocol)
                            .replace('{{coverImage_protocol}}', row.coverImage_protocol)
                            .replace('{{name_protocol}}', row.name_protocol)
                            .replace('{{objective_protocol}}', row.objective_protocol);
                        res.set('Content-Type', 'text/html');
                        res.send(modifiedHTML);
                    }
                });
            } else {
                res.status(404).send('Protocol not found');
            }
        }
    });
};

// Exporting modularized functions;
module.exports = {
    dinamicProtocolId,
    dinamicProtocolFinishedId,
};