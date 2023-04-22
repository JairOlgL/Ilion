const express = require('express');
const { getComponents } = require('../Controllers/getComponents.js');
const { createComponents } = require('../Controllers/createComponents.js');
const components = express();

components.get('/', async(req, res) => {
    try {
        res.send(await getComponents(req.query));
    } catch (error) {
        res.status(404).send({error})
    }
});
components.post('/', async(req, res) => {
    try {
        const {body} = req;
        res.status(201).send(await createComponents(body));
    } catch (error) {
        res.status(400).send({error});
    }
})

module.exports = components;