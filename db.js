const { DBuser, DBpassword, DBhost } = require('./credentials.js');
const {MongoClient} = require('mongodb')

const uri = `mongodb+srv://${DBuser}:${DBpassword}@${DBhost}`;

const client = new MongoClient(uri);

const run = async() => {
    try {
        await client.connect();
        await client.db('test').command({ping: 1});
        console.log('xd')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {client, run}