const mongoose = require('mongoose');
const { Schema } = mongoose

// may not need to implement
const adminSchema = new Schema({
    // id: create automatically in mongoDB
    userID: {
        required:true,
        // type:String,
        // get: write function to get from user ID ,
        unique:true,
        trim:true
    }
})

module.exports=mongoose.model('admin' ,adminSchema);