// Importing node modules;
const db = require('../../db');
const path = require('path');

// Register

function getRegisterPage(req, res) {
    res.sendFile(path.join(__dirname, '..', '..' + '/views/main/register.html'));
}

function registering(req, res) {
    const { name_user, password_user, type_user } = req.body;
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
    const { name_user, password_user } = req.body;

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
        }
    });
};

module.exports = {
    getRegisterPage,
    registering,
    logging
};