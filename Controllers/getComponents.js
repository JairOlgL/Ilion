const { ObjectId } = require("mongodb");
const { componentsCollection } = require("../db")

const getComponents = async data => {
    console.log(data)
    const cursor = componentsCollection.find(data ? data : {}, {});
    const componentsData = []
    await cursor.forEach(e => {
        componentsData.push(e)
    });
    if(!componentsData.length) throw 'No se han encontrado componentes con esas características';
    return componentsData;
}
const getComponentById = async id => {
    const component = await componentsCollection.findOne({_id: new ObjectId(id)});
    if(component) return component;
    else throw 'No se ha encontrado ningún componentne con ese ID';
}

module.exports = {getComponents, getComponentById}