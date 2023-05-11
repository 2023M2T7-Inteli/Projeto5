// CRUD functions definition

const table = 'protocols';

// READ
function read(db, callback){
    db.all(`SELECT * FROM ${table}`, (err, rows) => {
        if (err){
            callback(err, null);
            return;
        }
        callback(null, rows);
    });
}

// CREATE
function create(db, data, callback){
    const { name, objective, collector } = data;

    db.run(`INSERT INTO ${table} (name, objective, collector) VALUES (?, ?, ?)`, [name, objective, collector], function (err) {
        if (err){
            callback(err, null);
            return;
        }
        callback(null, this.lastID);
    });
}

// UPDATE
function update(db, data, callback){
    const { id, name, objective, collector } = data;

    db.run(`UPDATE ${table} SET name = ?, objective = ?, collector = ? WHERE id = ?`, [name, objective, collector, id], function (err) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, this.changes);
    });
}

// DELETE
function remove(db, id, callback){
    db.run(`DELETE FROM ${table} WHERE id = ?`, [id], function(err){
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, this.changes);
    });
}

// Export of modules
module.exports = {
    read,
    create, 
    update,
    remove,
};
