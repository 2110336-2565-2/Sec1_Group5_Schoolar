const mongoose = require('mongoose');
const { Schema } = mongoose

const scholarshipSchema = new Schema({
    // id: create automatically in mongoDB
    name: {                     // organization name or name
        required:true,
        type:String,
        index:false,
        unique:false,
        lowercase:true,
        trim:true
    },
    provider_id: {
        required:true,
        // type:Object,
        // index:true,
        unique:true,
        lowercase:false,
        trim:true
    },
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
    },
    due: {
        required:true,
        // type:Date,
    }
})

module.exports=mongoose.model('scholarship' ,scholarshipSchema);