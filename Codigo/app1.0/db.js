const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Conexão com o banco de dados estabelecida.')
        db.run(`CREATE TABLE IF NOT EXISTS protocols (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text, 
                objective text, 
                collector text)`,
        (err) => {
            if (err) {
                console.log('Erro ao criar tabela protocols:', err.message);
            } else {
                console.log('A tabela protocols foi criada com sucesso.');
            } 
        });
        db.run(`CREATE TABLE IF NOT EXISTS collectors (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                protocol_id integer, 
                name_collector text,
                FOREIGN KEY ( protocol_id ) REFERENCES protocols( id ))`,
        (err) => {
            if (err) {
                console.log('Erro ao criar tabela collectors:', err.message);
            } else {
                console.log('A tabela collectors foi criada com sucesso.');
            } 
        });
    };
});

module.exports = db;
