const mongoose = require('mongoose')
const { Schema } = mongoose

const studentSchema = new Schema({
    // id: create automatically in mongoDB
    userID: {
        required:true,
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        // get: write function to get from user ID ,
        // unique:true,
        // trim:true
    },
    firstName: {
        required:true,     
        type:String,       
        // maxLength:40,
        lowercase:true,
        trim:true
    },
    lastName: {
        required:true,
        type:String,
        maxLength:40,
        lowercase:true,
        trim:true
    },
    bd: {               //birthdate ,using Date type has some complicated change
        required:true,
        type:Date,      //possible to change
        maxLength:8,
        // lowercase:false,
        trim:true
    },
    // age: calculate from bd
    gender: {
        required:true,
        type:String,
        maxLength:10,
        enum:['male','female'],
        lowercase:true,
        trim:true
    },
    education: [
		{
			gpax: Number,
		},
		{
			field: String,
		},
	],
    // below this is the criteria for matching
    householdIncome: {          // backend tranform number to rank 
        required:true,
        type:String,
        maxLength:15,
        enum:['high','medium','low'],    // changing later
        index:true,
        lowercase:true,
        trim:true
    },
    targetNation: {
        required:true,
        type:String,
        maxLength:40,
        index:true,
        lowercase:true,
        trim:true
    },
    typeOfScholarship: {
        required:true,
        type:String,
        maxLength:15,
        enum:['full','partial','renewable','fellow'],
        index:true,
        lowercase:true,
        trim:true
    },
    employment: {           //currently employed or unemployed
        required:true,
        type:Boolean,
        index:true,
        trim:true
    },
    field: {                // field of interest
        required:true,
        type:String,
        maxLength:40,
        index:true,
        unique:true,
        trim:true
    }
})

module.exports = mongoose.model('Students', studentSchema)
