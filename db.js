const mongoose = require('mongoose')
require('colors')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
        // await mongoose.connect
            useNewUrlParser:true,
            useUnifiedTopology:true
    })
    console.log('Successfully connected to MongoDB')
 } catch(err) {
        console.error('Error connecting to MongoDB', err.message)
    }
}

module.exports = connectDB;