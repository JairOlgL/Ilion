const { ObjectId } = require("mongodb");
const { componentsCollection } = require("../db");

const updateComponent = async(id, data) => {
    console.log(id);
    console.table(data);
    const filter = {_id: new ObjectId(id)};
    const originalComponent = await componentsCollection.findOne(filter);
    const updated = await componentsCollection.replaceOne(filter, {...originalComponent, ...data});
    console.log(updated)
    return updated;
}

module.exports = {updateComponent};