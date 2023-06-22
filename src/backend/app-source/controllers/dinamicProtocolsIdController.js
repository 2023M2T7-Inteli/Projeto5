// Importing Node.js modules
const db = require('../../../data/db'); // Module for interacting with the database
const fs = require('fs'); // Module for working with the file system
const path = require('path'); // Module for handling file paths

// Function to handle requests for dynamic in-progress protocols
function dinamicProtocolId(req, res) {
    // Get the protocol ID from the request parameters
    const protocolId = req.params.id;

    // Query the database to get the information for the protocol with the provided ID
    db.get('SELECT * FROM tbl_protocols WHERE id_protocol = ?', [protocolId], (err, row) => {
        if (err) {
            // If there's an error, log the error to the console and send a 500 (Internal Server Error) response
            console.error(err);
            res.status(500).send('Error getting info from db');
        } else {
            if (row) {
                // If a protocol is found, read the HTML file for listing in-progress protocols
                fs.readFile(path.join(__dirname, '..', '..' + '/views/produtor/listingProtocols.html'), 'utf8', (err, data) => {
                    if (err) {
                        // If there's an error reading the HTML file, log the error to the console and send a 500 (Internal Server Error) response
                        console.error(err);
                        res.status(500).send('Error reading HTML file');
                    } else {
                        // Replace placeholders in the HTML with values obtained from the database
                        const modifiedHTML = data
                            .replace('{{id_protocol}}', row.id_protocol)
                            .replace('{{coverImage_protocol}}', row.coverImage_protocol)
                            .replace('{{name_protocol}}', row.name_protocol)
                            .replace('{{objective_protocol}}', row.objective_protocol);

                        // Set the response header to HTML and send the modified HTML as the response
                        res.set('Content-Type', 'text/html');
                        res.send(modifiedHTML);
                    }
                });
            } else {
                // If no protocol is found, send a 404 (Not Found) response
                res.status(404).send('Protocol not found');
            }
        }
    });
};

// Function to handle requests for dynamic finished protocols
function dinamicProtocolFinishedId(req, res) {
    // Get the protocol ID from the request parameters
    const protocolId = req.params.id;

    // Query the database to get the information for the protocol with the provided ID
    db.get('SELECT * FROM tbl_protocols WHERE id_protocol = ?', [protocolId], (err, row) => {
        if (err) {
            // If there's an error, log the error to the console and send a 500 (Internal Server Error) response
            console.error(err);
            res.status(500).send('Error getting info from db');
        } else {
            if (row) {
                // If a protocol is found, read the HTML file for listing finished protocols
                fs.readFile(path.join(__dirname, '..', '..' + '/views/researcher/listingProtocolsFinished.html'), 'utf8', (err, data) => {
                    if (err) {
                        // If there's an error reading the HTML file, log the error to the console and send a 500 (Internal Server Error) response
                        console.error(err);
                        res.status(500).send('Error reading HTML file');
                    } else {
                        // Replace placeholders in the HTML with values obtained from the database
                        const modifiedHTML = data
                            .replace('{{id_protocol}}', row.id_protocol)
                            .replace('{{coverImage_protocol}}', row.coverImage_protocol)
                            .replace('{{name_protocol}}', row.name_protocol)
                            .replace('{{objective_protocol}}', row.objective_protocol);

                        // Set the response header to HTML and send the modified HTML as the response
                        res.set('Content-Type', 'text/html');
                        res.send(modifiedHTML);
                    }
                });
            } else {
                // If no protocol is found, send a 404 (Not Found) response
                res.status(404).send('Protocol not found');
            }
        }
    });
};

// Export the functions to be used by other modules
module.exports = {
    dinamicProtocolId,
    dinamicProtocolFinishedId,
};
