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
	role: {
		type: String,
		required: true,
		enum: ['provider', 'student', 'admin'],
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	refreshToken: String,
})

module.exports = mongoose.model('Users', userSchema)
