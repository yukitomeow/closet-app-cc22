require('dotenv').config(); // -r dotenv/config を使っていたらいらない　https://www.npmjs.com/package/dotenv
//connection between knex< ====> DB  
module.exports = {
    //development: {
    client: 'pg',//which kind of DB knex using
    connection:
        process.env.DATABASE_URL ||
        `postgres://${process.env.DB_USER}@127.0.0.1:5432/${process.env.DB_NAME}`,
    ssl: { rejectUnauthorized: false },
    migrations: {
        directory: __dirname + '/db/migrations',// where to look where the migration file is 
    },
    seeds: {
        directory: __dirname + '/db/seeds',// where to look seeds files
    }

    //}
};

//THIS FILE IS EXPORTING A OBJECT (KNEX CONFIG)
// knex migrate:new something
    //look for knexfile.js and try to find a knex config object
//what i was doing before was 
// knexfile was exporting a function (knex)
// const knex = require("./knexfile")
// knex is a function

// instead of doing:
// const knex = require("./knexfile")
// you should do:
// const knex = require("knex");// this knex is a library
// knex is from the library
// knex(require("./knexfile"))//what so ai have in knex file
// now knex is the function that you need