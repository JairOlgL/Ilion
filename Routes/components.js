const express = require('express');
const { getComponents } = require('../Controllers/getComponents.js');
const components = express();

components.get('/', async(req, res) => {
    try {
        res.send(await getComponents(req.query));
    } catch (error) {
        res.status(404).send({error})
    }
})

module.exports = components;