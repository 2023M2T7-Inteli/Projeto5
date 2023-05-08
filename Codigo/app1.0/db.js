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
    };
});

module.exports = db;
