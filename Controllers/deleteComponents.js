const { ObjectId } = require('mongodb');
const {client} = require('./../db.js');

const deleteComponent = async id => {
    console.log(id)
    const db = client.db('test');
    const collection = db.collection('components');
    const deleteResult = await collection.deleteOne({_id: new ObjectId(id)});
    if(deleteResult.deletedCount) return {message: 'Resgistro eliminado con éxito', deleteResult};
    else throw 'No se ha podido eliminar el registro';
}

module.exports = {deleteComponent};