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
		lowercase: true,
		trim: true,
	},
	lastName: {
		required: true,
		type: String,
		lowercase: true,
		trim: true,
	},
	birthdate: {
		//birthdate ,using Date type has some complicated change
		required: true,
		type: Date, //possible to change
		maxLength: 8,
		trim: true,
	},
	// age: calculate from bd
	gender: {
		required: true,
		type: String,
		enum: ['male', 'female', 'non-binary'],
	},
	education: [
		{
			gpax: String,
		},
		{
			faculty: String,
		},
	],
	// below this is the criteria for matching
	householdIncome: {
		// backend tranform number to rank
		type: String,
		enum: ['high', 'medium', 'low'], // changing later
		index: true,
	},
	targetNation: {
		type: String,
		maxLength: 60,
		index: true,
		lowercase: true,
		trim: true,
	},
	typeOfScholarship: {
		type: String,
		enum: ['full', 'partial', 'renewable', 'fellow'],
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
