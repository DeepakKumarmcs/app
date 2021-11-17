var query = require("../config/query");

module.exporst = {
    find: async function(){
        return await query(`select * from genre` );
    },
    findById: async function(id){
        return await query(`select * from genre where id = ${id}`); 
    },
    findOneAndRemove: async function(id){
        return await query(`delete from genre where id = ${id}`);
    },
    insert: async function(genre){
        return await query(`insert into genre (name, description) VALUES('${genre.name}', '${genre.billing.description}')`);
    }
}