const mongoose = require("mongoose");

const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_LOCAL_CONNECTION)
    console.log("MongoDB connected Successfully")
}

module.exports = connectDB