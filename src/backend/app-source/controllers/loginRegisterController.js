// Importing node modules;
const db = require('../../../data/db');
const path = require('path');

// Importing controllers;
const cryptographyController = require('../security/cryptographyController');

// Register
function getRegisterPage(req, res) {
    res.sendFile(path.join(__dirname, '..', '..' + '/views/main/register.html'));
}

function registering(req, res) {
    const { name_user, password_user, type_user } = req.body;
    // const encryptedName = cryptographyController.crypt(name_user);
    // const encryptedPassword = cryptographyController.crypt(password_user);
    
    db.run('INSERT INTO tbl_users (name_user, password_user, type_user) VALUES (?, ?, ?)', [name_user, password_user, type_user], (err) => {
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
    // const { name_user, password_user } = req.body;

    // db.all('SELECT id_user, name_user, password_user, type_user FROM tbl_users', (err, rows) => {
    //     if (err) {
    //         console.error(err.message);
    //         return res.status(500).send('Internal server error');
    //     }

    //     let decryptedName;
    //     let decryptedPassword;

    //     let goResearcher = false;
    //     let goCollector = false;
    //     let foundUser = false;
    //     for (const row of rows) {
    //         decryptedName = cryptographyController.decrypt(row.name_user);
    //         decryptedPassword = cryptographyController.decrypt(row.password_user);
            
    //         console.log({decryptedName, decryptedPassword});

    //         if (decryptedName === name_user && decryptedPassword === password_user) {
    //             foundUser = true;
    //             console.log(`foundUser: ${foundUser}`);
    //             if (row.type_user == "Coletor") {
    //                 console.log("Coletor");
    //                 goCollector = true;
    //             } else if (row.type_user == "Pesquisador") {
    //                 console.log("Pesquisador");
    //                 goResearcher = true;
    //             }
    //             break
    //         }
    //     }

    //     if (!foundUser) {
    //         return res.status(401).send('Invalid username or password');
    //     }

    //     for (const row of rows) {
    //         // const encryptedName = cryptographyController.crypt(row.name_user);
    //         // const encryptedPassword = cryptographyController.crypt(row.password_user);

    //         const encryptedName = cryptographyController.crypt(decryptedName);
    //         const encryptedPassword = cryptographyController.crypt(decryptedPassword);

    //         console.log({encryptedName, encryptedPassword});

    //         db.run('UPDATE tbl_users SET name_user = ?, password_user = ? WHERE id_user = ?', [encryptedName, encryptedPassword, row.id_user], (err) => {
    //             if (err) {
    //                 console.error(err.message);
    //             } else {
    //                 console.log("Data Updated");
    //             }

    //             console.log(goCollector);
    //             console.log(goResearcher);

    //             if (goCollector) {
    //                 console.log("go collector");
    //                 res.redirect('/home_collector');
    //             } else if (goResearcher) {
    //                 console.log("go researcher");
    //                 res.redirect('/home_researcher');
    //             }
    //         });
    //     }
    // });

    const { name_user, password_user } = req.body;

    db.all('SELECT id_user, name_user, password_user, type_user FROM tbl_users', (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal server error');
        }

        let goResearcher = false;
        let goCollector = false;
        let foundUser = false;

        for (const row of rows) {
            if (row.name_user === name_user && row.password_user === password_user) {
                foundUser = true;
                if (row.type_user === "Coletor") {
                    goCollector = true;
                } else if (row.type_user === "Pesquisador") {
                    goResearcher = true;
                }
                break;
            }
        }

        if (!foundUser) {
            return res.status(401).send('Invalid username or password');
        }

        if (goCollector) {
            console.log("go collector");
            res.redirect('/home_collector');
        } else if (goResearcher) {
            console.log("go researcher");
            res.redirect('/home_researcher');
        }
        
    });
};


module.exports = {
    getRegisterPage,
    registering,
    logging
};