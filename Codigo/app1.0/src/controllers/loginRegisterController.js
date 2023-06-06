// Importing node modules;
const db = require('../../db');
const path = require('path');

// Importing controllers;
const cryptographyController = require('../security/cryptographyController');

// Register
function getRegisterPage(req, res) {
    res.sendFile(path.join(__dirname, '..', '..' + '/views/main/register.html'));
}

function registering(req, res) {
    const { name_user, password_user, type_user } = req.body;
    const encryptedName = cryptographyController.crypt(name_user);
    const encryptedPassword = cryptographyController.crypt(password_user);
    
    db.run('INSERT INTO tbl_users (name_user, password_user, type_user) VALUES (?, ?, ?)', [encryptedName, encryptedPassword, type_user], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating user');
        } else {
            res.send('User creation successful!');
        }
    });
};

// Login
function logging(req, res) {
    const { name_user, password_user } = req.body;

    db.each('SELECT id_user, name_user, password_user FROM tbl_users', (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            const decryptedName = cryptographyController.decrypt(row.name_user);
            const decryptedPassword = cryptographyController.decrypt(row.password_user);

            db.run('UPDATE tbl_users SET name_user = ?, password_user = ? WHERE id_user = ?', [decryptedName, decryptedPassword, row.id_user], (err) => {
                if (err) {
                    console.error(err.message);
                } else {

                    db.get('SELECT * FROM tbl_users WHERE name_user = ? AND password_user = ? ', [ name_user, password_user ], (err, row) => {
                        if (err) {
                            console.error(err.message);
                            res.status(500).send('Internal server error');
                        } else if (!row) {
                            res.status(401).send('Invalid username or password');
                        } else {
                            if (row.type_user == "Coletor") {
                                res.redirect('/home_collector');
                            } else if (row.type_user == "Pesquisador") {
                                res.redirect('/home_researcher');
                            }

                            db.each('SELECT id_user, name_user, password_user FROM tbl_users', (err, row) => {
                                if (err) {
                                    console.error(err.message);
                                } else {
                                    const encryptedName = cryptographyController.crypt(name_user);
                                    const encryptedPassword = cryptographyController.crypt(password_user);

                                    db.run('UPDATE tbl_users SET name_user = ?, password_user = ? WHERE id_user = ?', [encryptedName, encryptedPassword, row.id_user], (err) => {
                                        if (err) {
                                            console.error(err.message);
                                        } else {
                                            console.log("Data Updated");
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};

module.exports = {
    getRegisterPage,
    registering,
    logging
};