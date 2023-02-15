const mongoose = require('mongoose')
const { Schema } = mongoose

const studentSchema = new Schema({
	// id: create automatically in mongoDB
	userID: {
		type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		// get: write function to get from user ID ,
	},
	firstName: {
		required: true,
		type: String,
		// lowercase: true,
		trim: true,
	},
	lastName: {
		required: true,
		type: String,
		// lowercase: true,
		trim: true,
	},
	birthdate: {
		//birthdate ,using Date type has some complicated change
		required: true,
		type: String, //possible to change
		maxLength: 10,
		trim: true,
	},
	// age: calculate from bd
	gender: {
		required: true,
		type: String,
		enum: ['male', 'female', 'non-binary'],
	},
	phoneNumber: {
		required: true,
		type: String,
		maxLength: 10,
		unique: true,
		trim: true,
	},
	gpax: {
		require: true,
		type: Number,
	},
	degree: {
		type: String,
		enum: ['', 'high school', 'bachelor', 'master', 'doctoral'],
	},
	school: {
		type: String,
		trim: true,
	},
	program: {
		type: String,
		enum: [
			'',
			'Sci-Math',
			'Art-Cal',
			'Art-Language',
			'Art-Society',
			'Art-General',
			'Faculty of Allied Health Sciences',
			'Faculty of Architecture',
			'Faculty of Arts',
			'Faculty of Commerce and Accountancy',
			'Faculty of Communication Arts',
			'Faculty of Dentistry',
			'Faculty of Economics',
			'Faculty of Education',
			'Faculty of Engineering',
			'Faculty of Fine and Applied Arts',
			'Faculty of Law',
			'Faculty of Medicine',
			'Faculty of Nursing',
			'Faculty of Pharmaceutical Sciences',
			'Faculty of Political Science',
			'Faculty of Psychology',
			'Faculty of Science',
			'Faculty of Sports Science',
			'Faculty of Veterinary Science',
		],
	},
	// below this is the criteria for matching
	householdIncome: {
		// backend tranform number to rank
		type: Number,
		index: true,
	},
	targetNation: {
		type: String,
		maxLength: 60,
		index: true,
		// lowercase: true,
		trim: true,
	},
	typeOfScholarship: {
		type: String,
		enum: ['', 'full', 'partial', 'renewable', 'fellow'],
		index: true,
	},
	employment: {
		//currently employed or unemployed
		type: Boolean,
		index: true,
		trim: true,
	},
	field: {
		// field of interest
		type: String,
		index: true,
		trim: true,
	},
})

module.exports = mongoose.model('Students', studentSchema)
