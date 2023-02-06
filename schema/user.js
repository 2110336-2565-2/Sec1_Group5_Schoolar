const mongoose = require('mongoose');

const userSchema = new Schema({
    // id: create automatically in mongoDB
    username: {
        required:true,         
        type:String,            
        maxLength:40,
        index:false,
        unique:true,
        lowercase:false,
        trim:true 
    },
    password: {
        required:true,
        type:String,
        maxLength:40,
        index:false,
        // validate function needed
        unique:false,
        lowercase:false,
        trim:true
    },
    email: {
        required:true,
        type:String,
        // maxLength:50,
        index:false,
        unique:true,
        lowercase:false,
        trim:true
    },
    role: {
        required:true,
        type:String,
        // maxLength:10,
        enum:['provider','student','admin'],
        index:false,
        unique:false,
        // lowercase:true,
        // trim:true
    },
    phoneNumber: {
        required:true,
        type:String,
        // maxLength:10, 
        index:false,
        // unique:true,
        // lowercase:false,
        // trim:true
    }
})

module.exports=mongoose.model('user' ,userSchema);

//sub schema used
// required:
// type:
// get:
// index:
// unique:
// lowercase:
// trim:
// enum:
// maxLength: