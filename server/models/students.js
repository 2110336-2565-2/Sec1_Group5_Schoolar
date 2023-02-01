const mongoose = require('mongoose')
const { Schema } = mongoose

const studentSchema = new Schema({
	userID: {
		type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	birthdate: {
		type: String,
	},
	gender: {
		type: String,
	},
	education: [
		{
			gpax: Number,
		},
		{
			field: String,
		},
	],
	householdIncome: {
		type: String,
	},
	targetNation: {
		type: String,
	},
	typeOfScholarship: {
		type: String,
	},
	employment: {
		type: String,
	},
	field: {
		type: String,
	},
})

module.exports = mongoose.model('Students', studentSchema)
