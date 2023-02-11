const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
	// id: create automatically in mongoDB
	username: {
		required: true,
		type: String,
		maxLength: 40,
		unique: true,
		trim: true,
	},
	password: {
		required: true,
		type: String,
	},
	email: {
		//required: true,
		type: String,
		unique: true,
		trim: true,
	},
	role: {
		//required: true,
		type: String,
		enum: ['provider', 'student', 'admin'],
	},
	phoneNumber: {
		//required: true,
		type: String,
		// maxLength:10,
		// unique:true,
		// trim:true
	},
	refreshToken: String,
	resetPasswordToken: String,
  	resetPasswordExpires: Date
})

module.exports = mongoose.model('Users', userSchema)
