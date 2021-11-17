var query = require("../config/query");

module.exporst = {
    find: async function(){
        return await query(`select * from movie as m left join movie_genre
         as mg on mg.movieId=m.id left join genre g on g.id=mg.genreId ` );
    },
    findById: async function(id){
        return await query(`select * from movie as m left join movie_genre as mg
         on mg.movieId=m.id left join genre g on g.id=mg.genreId where id = ${id}`); 
    },
    findOneAndRemove: async function(id){
        return await query(`delete from movie where id = ${id}`);
    },
    insert: async function(movie){
        return await query(`insert into movie (name, description) VALUES('${movie.name}', '${movie.billing.description}')`);
    }
}