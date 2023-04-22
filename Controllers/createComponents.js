const {client} = require('./../db.js');

const createComponents = async(data) => {
    try {
        const db = client.db('test')
        const collection = db.collection('components');
        if(!(data.manufacturer && data.name && data.category)) throw 'Faltan datos para el registro del componente';
        const component = createFunctions[`create${data.category}`](data);
        const result = await collection.insertOne(component);
        return {message: 'Componente creado con éxito', component: result};
    } catch (error) {
        return {error}
    }
}

const createFunctions = {
    createMotherboard: (data) => {
        console.log('mother')
        let component = {};
        if(data.cpu && data.chipset && data.socket) component = {
            manufacturer: data.manufacturer,
            name: data.name,
            category: data.category,
            cpu: data.cpu,
            chipset: data.chipset,
            socket: data.socket
        }
        else throw 'Faltan datos para el registro del componente';
        if(data.memory.max && data.memory.slots && data.memory.type && data.memory.hz) component.memory = data.memory;
        else throw 'Faltan datos para el registro de componente en apartado «memory»';
        if(data.form) component.form = data.form;
        else throw 'Faltan datos para el registro del componente';
        return component;
    }
}
module.exports = {createComponents};