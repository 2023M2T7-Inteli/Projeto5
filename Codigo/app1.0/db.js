const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Conexão com o banco de dados estabelecida.')
        db.run(`CREATE TABLE IF NOT EXISTS tbl_protocols (
                id_protocol INTEGER PRIMARY KEY AUTOINCREMENT,
                name_protocol text, 
<<<<<<< Updated upstream
                objective_protocol)`,
=======
                objective_protocol text,
                startDate_protocol text,
                endDate_protocol text,
                status_protocol text,
                coverImage_protocol text)`,
>>>>>>> Stashed changes
        (err) => {
            if (err) {
                console.log('Erro ao criar tbl_protocols:', err.message);
            } else {
                console.log('A tbl_protocols foi criada com sucesso.');
            } 
        });
        db.run(`CREATE TABLE IF NOT EXISTS tbl_samples (
                id_sample INTEGER PRIMARY KEY AUTOINCREMENT,
                name_sample integer, 
                description_sample text,
                id_protocol integer,
                FOREIGN KEY ( id_protocol ) REFERENCES tbl_protocols( id_protocol ))`,
        (err) => {
            if (err) {
                console.log('Erro ao criar tbl_samples:', err.message);
            } else {
                console.log('A tbl_samples foi criada com sucesso.');
            } 
        });
        db.run(`CREATE TABLE IF NOT EXISTS tbl_steps (
                id_step INTEGER PRIMARY KEY AUTOINCREMENT,
                name_step integer, 
                description_step text,
                id_sample integer,
                FOREIGN KEY ( id_sample ) REFERENCES tbl_samples( id_sample ))`,
        (err) => {
            if (err) {
                console.log('Erro ao criar tbl_steps:', err.message);
            } else {
                console.log('A tbl_steps foi criada com sucesso.');
            }
        });

        // Change "description_field" to "type_field"
        db.run(`CREATE TABLE IF NOT EXISTS tbl_fields (
                id_field INTEGER PRIMARY KEY AUTOINCREMENT,
                name_field integer, 
                description_field text,
                answer_field text,
                id_step integer,
                FOREIGN KEY ( id_step ) REFERENCES tbl_steps( id_step ))`,
        (err) => {
            if (err) {
                console.log('Erro ao criar tbl_fields:', err.message);
            } else {
                console.log('A tbl_fields foi criada com sucesso.');
            } 
        });
    };
});

module.exports = db;
