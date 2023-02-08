const mongoose = require('mongoose')
const { Schema } = mongoose

const scholarshipSchema = new Schema({
	// id: create automatically in mongoDB
	name: {
		// organization name or name
		required: true,
		type: String,
		lowercase: true,
		trim: true,
	},
	provider_id: {
		type: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
	},
	householdIncome: {
		// backend tranform number to rank
		required: true,
		type: String,
		enum: ['high', 'medium', 'low'], // changing later
		index: true,
	},
	targetNation: {
		required: true,
		type: String,
		maxLength: 60,
		index: true,
		lowercase: true,
		trim: true,
	},
	typeOfScholarship: {
		required: true,
		type: String,
		enum: ['full', 'partial', 'renewable', 'fellow'],
		index: true,
	},
	employment: {
		//currently employed or unemployed
		required: true,
		type: Boolean,
		index: true,
		trim: true,
	},
	field: {
		// field of interest
		required: true,
		type: String,
		index: true,
		trim: true,
	},
	due: {
		required: true,
		// type:Date,
	},
})

module.exports = mongoose.model('scholarship', scholarshipSchema)
