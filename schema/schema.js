const userSchema = new Schema({
    // id: create automatically in mongoDB
    username: {
        required:true, //Checked
        type:String, //Checked
        maxLength:40, //Checked
        index:false, //Checked
        unique:true, //Checked
        lowercase:false, //Checked
        trim:true //Checked
    },
    password: {
        required:true, //Checked
        type:String, //Checked
        maxLength:40, //Checked
        index:false, //Checked
        // validate function needed
        unique:false, //Checked
        lowercase:false, //Checked
        trim:true //Checked
    },
    email: {
        required:true, //Checked
        type:String, //Checked
        // maxLength:50,
        index:false, //Checked
        unique:true, //Checked
        lowercase:false, //Checked
        trim:true //Checked
    },
    role: {
        required:true, //Checked
        type:String, //Checked
        // maxLength:10,
        enum:['provider','student','admin'], //Checked
        index:false, //Checked
        unique:false, //Checked
        // lowercase:true, 
        // trim:true
    },
    phoneNumber: {
        required:true, //Checked
        type:String, //Checked
        // maxLength:10, 
        index:false, //Checked
        // unique:true,
        // lowercase:false,
        // trim:true
    }
})

const studentSchema = new Schema({
    // id: create automatically in mongoDB
    userID: {
        required:true //Checked
        // type:String,
        // get: write function to get from user ID ,
        // unique:true,
        // trim:true
    },
    firstName: {
        required:true, //Checked
        type:String, //Checked
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
    bd: { //birthdate ,using Date type has some complicated change
        required:true,
        type:Date,      //possible to change
        maxLength:8,
        index:false,
        unique:false,
        // lowercase:false,
        trim:true
    },
    // age: {
    //     required:true,
    //     type:Number,
    //     min:10,
    //     index:false,
    //     unique:false,
    //     trim:true
    // },
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
    // education: { 
    //     required:true,
    //     type:Array,    // {{education,gpax},{education,gpax},}
    //     // maxLength:10,
    //     index:false,
    //     unique:false,
    //     lowercase:false,
    //     trim:true
    // },
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

const providerSchema = new Schema({
    // id: create automatically in mongoDB
    userID: {
        required:true,
        // type:String,
        // get: write function to get from user ID ,
        unique:true,
        trim:true
    },
    providerName: {
        required:true,
        type:String,
        maxLength:40,
        index:false,
        unique:false,
        lowercase:true,
        trim:true
    },
    address: {
        required:true,
        type:String,
        maxLength:255,
        index:false,
        unique:false,
        lowercase:true,
        trim:true
    },
    website: {
        required:true,
        type:String,
        maxLength:250,
        index:false,
        unique:false,
        lowercase:true,
        trim:true
    },
    creditCardNumber: {
        required:true,
        type:Number,
        maxLength:16,
        unique:true,
        trim:true
    },
    verifyStatus: {
        required:true,
        type:Boolean,
        trim:true
    },
    // householdIncome: {          // backend tranform number to rank 
    //     required:true,
    //     type:String,
    //     maxLength:15,
    //     enum:['high','medium','low'],    // changing later
    //     index:true,
    //     unique:false,
    //     lowercase:true,
    //     trim:true
    // },
    // targetNation: {
    //     required:true,
    //     type:String,
    //     maxLength:40,
    //     index:true,
    //     unique:false,
    //     lowercase:true,
    //     trim:true
    // },
    // typeOfScholarship: {
    //     required:true,
    //     type:String,
    //     maxLength:15,
    //     enum:['full','partial','renewable','fellow'],
    //     index:true,
    //     unique:false,
    //     lowercase:true,
    //     trim:true
    // },
    // employment: {           //currently employed or unemployed
    //     required:true,
    //     type:Boolean,
    //     index:true,
    //     trim:true
    // },
    // field: {                // field of interest
    //     required:true,
    //     type:String,
    //     maxLength:40,
    //     index:true,
    //     unique:true,
    //     lowercase:false,
    //     trim:true
    // }
})

// is it needed
// const adminSchema = new Schema({
//     // id: create automatically in mongoDB
//     userID: {
//         required:true,
//         // type:String,
//         // get: write function to get from user ID ,
//         unique:true,
//         trim:true
//     }
// })

const scholarshipSchema = new Schema({
    // id: create automatically in mongoDB
    due: {
        required:true,
        // type:String,
        // get: write function to get from user ID ,
        unique:true,
        trim:true
    }
})



// required:
// type:
// get:
// index:
// unique:
// lowercase:
// trim:
// enum:
// maxLength: