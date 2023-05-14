const { ObjectId } = require("mongodb");
const { componentsCollection } = require("../db");

const updateComponent = async(id, data) => {
    console.log(id);
    console.table(data);
    const updated = await componentsCollection.replaceOne({_id: new ObjectId(id)}, data);
    return updated;
}

module.exports = {updateComponent};