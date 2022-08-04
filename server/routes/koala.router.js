const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'koalas', // name of database
    host: 'localhost',
    port: 5432,
    max: 10, // max number of concurrent connections
    idleTimeoutMillis: 10000 // attempt to connect for 10 seconds
}; 
const pool = new Pool(config);

pool.on('connect', () => {
    console.log('postgresql connected!!!');
});

pool.on('error', (error) => {
    console.log('Error connecting to db', error);
});

// GET
koalaRouter.get('/', (req, res) => {
    console.log('in GET');
    const query = 'SELECT * FROM "koalas";';
    pool.query(query)
        .then(results => {
            console.log(results);
            res.send(results.rows);
        }).catch(err => {
            console.log('GET error', err);
            res.sendStatus(500);
        });
});

// POST


// PUT


// DELETE

module.exports = koalaRouter;