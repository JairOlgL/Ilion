const { client } = require("../db")

const getComponents = async(data) => {
    console.log(data)
    const database = client.db('test');
    const components = database.collection('components');
    const cursor = components.find(data ? data : {}, {});
    const componentsData = []
    await cursor.forEach(e => {
        componentsData.push(e)
    });
    if(!componentsData.length) throw 'No se han encontrado componentes con esas características';
    return componentsData;
}

module.exports = {getComponents}