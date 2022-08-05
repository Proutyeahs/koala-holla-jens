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

        })
});

// POST
koalaRouter.post('/', (req, res) => {
    let queryText = `
        INSERT INTO "koalas" ("name", "age", "gender", "ready_to_transfer", "notes")
        VALUES ($1, $2, $3, $4, $5);`;
    let queryValues = [
        req.body.name,
        req.body.age,
        req.body.gender,
        req.body.ready_to_transfer,
        req.body.notes
    ]

    pool.query(queryText, queryValues)
        .then( result => {
            res.sendStatus(200);
        }).catch( (err) => {
            console.log(err)
            res.sendStatus(500) //send 500
        })
});

// PUT


// DELETE
koalaRouter.delete('/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    
    const queryText = 
    `
    DELETE FROM "koalas"
    WHERE "id" = $1;
    `;
    pool.query(queryText, [id])
        .then( (result) => {
            res.sendStatus(200);
        }).catch( (err) => {
            console.log(err);
            res.sendStatus(500);
        });
})

// ROUTER EXPORTS
module.exports = koalaRouter;