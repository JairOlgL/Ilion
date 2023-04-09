const express = require('express');
const components = require('./components');
const routes = express();

routes.use('/components', components);

module.exports = routes;