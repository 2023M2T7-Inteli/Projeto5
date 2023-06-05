// Importing node modules;
const db = require('../../db');
// Importar o módulo de criptografia dos dados para criar um sistema de login mais seguro
// Fazer os dados serem enviados para o banco de dados de forma criptografada
// Descriptografar os dados quando eles retornarem para o sistema de login efetivamente
// Salvar essas informações do usuário por meio da session
// Ver se as sessions são afetadas pelo localstorage

// Register

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
    logging
};