const { ObjectId } = require('mongodb');
const {componentsCollection} = require('./../db.js');

const deleteComponent = async id => {
    console.log(id)
    const deleteResult = await componentsCollection.deleteOne({_id: new ObjectId(id)});
    if(deleteResult.deletedCount) return {message: 'Resgistro eliminado con éxito', deleteResult};
    else throw 'No se ha podido eliminar el registro';
}

module.exports = {deleteComponent};