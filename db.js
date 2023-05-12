const { DBuser, DBpassword, DBhost } = require('./credentials.js');
const {MongoClient} = require('mongodb')

const uri = `mongodb+srv://${DBuser}:${DBpassword}@${DBhost}`;

const client = new MongoClient(uri);

const database = client.db('test');

const componentsCollection = database.collection('components');

const run = async() => {
    try {
        await client.connect();
        await client.db('test').command({ping: 1});
        console.log('Conexión con la base de datos establecida');
    } catch (error) {
        console.log(error);
    }finally{
        await client.close();
    }
}

module.exports = {client, run, database, componentsCollection}