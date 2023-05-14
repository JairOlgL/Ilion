const express = require('express');
const { getComponents, getComponentById } = require('../Controllers/getComponents.js');
const { createComponents } = require('../Controllers/createComponents.js');
const { deleteComponent } = require('../Controllers/deleteComponents.js');
const { updateComponent } = require('../Controllers/updateComponent.js');
const { client } = require('../db.js');
const components = express();

components.get('/', async(req, res) => {
    try {
        await client.connect();
        res.send(await getComponents(req.query));
    } catch (error) {
        res.status(404).send({error});
    }finally{
        await client.close();
    }
});
components.get('/:id', async(req, res) => {
    try {
        await client.connect();
        const {id} = req.params;
        res.status(200).send(await getComponentById(id));
    } catch (error) {
        res.status(404).send({error});
    }finally{
        await client.close();
    }
})
components.post('/', async(req, res) => {
    try {
        await client.connect();
        const {body} = req;
        res.status(201).send(await createComponents(body));
    } catch (error) {
        res.status(400).send({error});
    }finally{
        await client.close();
    }
});
components.delete('/delete/:id', async(req, res) => {
    try {
        await client.connect();
        const {id} = req.params;
        res.status(200).send(await deleteComponent(id));
    } catch (error) {
        res.status(400).send({error});
    }finally{
        await client.close();
    }
})
components.put('update/:id', async(req, res) => {
    try {
        await client.connect();
        const {id} = req.params;
        res.status.send(await updateComponent(id, req.body));
    } catch (error) {
        res.status(404).send({error});
    }finally{
        await client.close();
    }
})

module.exports = components;