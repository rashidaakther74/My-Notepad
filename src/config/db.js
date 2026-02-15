const mongoose = require("mongoose");
const { mongodburl } = require("../secret");
const connectDB = async () =>{
 try {
    await mongoose.connect(mongodburl)
    console.log('Connection to DB is successfully')
      mongoose.connection.on('error',()=>{
        console.error('DB connection error: ',error)
    })
 } catch (error) {
   console.error('could not connect to DB: ',error.toString())
 }
}
module.exports = connectDB;