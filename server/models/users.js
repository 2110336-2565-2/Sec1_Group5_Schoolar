const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	type: {
		type: String,
		required: true,
	},
	tel: {
		type: String,
	},
	address: {
		type: String,
	},
})

module.exports = mongoose.model('Users', userSchema)
