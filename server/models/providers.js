const mongoose = require('mongoose')
const { Schema } = mongoose

const providerSchema = new Schema({
	// id: create automatically in mongoDB
	userID: {
		type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		// get: write function to get from user ID ,
		// unique:true,
		// trim:true
	},
	providerName: {
		required: true,
		type: String,
		maxLength: 40,
		lowercase: true,
		trim: true,
	},
	address: {
		required: true,
		type: String,
		maxLength: 255,
		lowercase: true,
		trim: true,
	},
	website: {
		required: true,
		type: String,
		maxLength: 250,
		lowercase: true,
		trim: true,
	},
	phoneNumber: {
		required: true,
		type: String,
		maxLength: 10,
		unique: true,
		trim: true
	},
	creditCardNumber: {
		required: true,
		type: Number,
		maxLength: 16,
		unique: true,
		trim: true,
	},
})

module.exports = mongoose.model('Providers', providerSchema)
