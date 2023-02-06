const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
	// id: create automatically in mongoDB
    username: {
        required:true,         
        type:String,            
        maxLength:40,
        unique:true,
        trim:true 
    },
    password: {
        required:true,
        type:String,
        maxLength:40,
        // validate function needed
        trim:true
    },
    email: {
        required:true,
        type:String,
        maxLength:50,
        unique:true,
        trim:true
    },
    role: {
        required:true,
        type:String,
        // maxLength:10,
        enum:['provider','student','admin'],
        // lowercase:true,
        // trim:true
    },
    phoneNumber: {
        required:true,
        type:String,
        // maxLength:10, 
        // unique:true,
        // lowercase:false,
        // trim:true
    },
	refreshToken: String,
})

module.exports = mongoose.model('Users', userSchema)
