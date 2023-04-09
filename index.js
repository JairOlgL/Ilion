const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const routes = require('./Routes/routes.js');
const { run } = require('./db.js');

const port = 6661;

server.use(bodyParser.json({limit: '50mb'}));
server.use('/', routes);

run()

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})