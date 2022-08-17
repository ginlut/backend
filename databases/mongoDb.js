const mongoose = require('mongoose');
const config = require('./config')

const connectMongoDb = async()=>{
  try{
    mongoose.connect(config.mongodbProducts.connectionString,
        {useNewUrlParser: true, 
        useUnifiedTopology: true,
        retryWrites:true})
        console.log('Connected to mongoose')

        
    }catch(error){
        throw new Error('Database Error');
    }
}

connectMongoDb();

module.exports = connectMongoDb;