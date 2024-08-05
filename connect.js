const mongoose=require('mongoose');

async function connectMongoDb(url){
    return mongoose.connect(url)
    .then((e)=>console.log("MongoDb Conected"));
}

module.exports={
    connectMongoDb
};