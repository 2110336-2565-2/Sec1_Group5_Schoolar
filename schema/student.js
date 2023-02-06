const mongoose = require('mongoose');

const studentSchema = new Schema({
    // id: create automatically in mongoDB
    userID: {
        required:true      
        // type:Object,
        // get: write function to get from user ID ,
        // unique:true,
        // trim:true
    },
    firstName: {
        required:true,     
        type:String,       
        // maxLength:40,
        index:false,
        unique:false,
        lowercase:true,
        trim:true
    },
    lastName: {
        required:true,
        type:String,
        maxLength:40,
        index:false,
        unique:false,
        lowercase:true,
        trim:true
    },
    bd: {               //birthdate ,using Date type has some complicated change
        required:true,
        type:Date,      //possible to change
        maxLength:8,
        index:false,
        unique:false,
        // lowercase:false,
        trim:true
    },
    // age: calculate from bd
    gender: {
        required:true,
        type:String,
        maxLength:10,
        enum:['male','female'],
        index:false,
        unique:false,
        lowercase:true,
        trim:true
    },
    education: {         
        required:true,
        type:Array,    // {{field,gpax},{field,gpax},}
    },

    // below this is the criteria for matching
    householdIncome: {          // backend tranform number to rank 
        required:true,
        type:String,
        maxLength:15,
        enum:['high','medium','low'],    // changing later
        index:true,
        unique:false,
        lowercase:true,
        trim:true
    },
    targetNation: {
        required:true,
        type:String,
        maxLength:40,
        index:true,
        unique:false,
        lowercase:true,
        trim:true
    },
    typeOfScholarship: {
        required:true,
        type:String,
        maxLength:15,
        enum:['full','partial','renewable','fellow'],
        index:true,
        unique:false,
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
        lowercase:false,
        trim:true
    }
})

module.exports=mongoose.model('student' ,studentSchema);