const mongoose = require('mongoose')
const { Schema } = mongoose

const studentSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	ssn: {
		type: String,
	},
	fname: {
		type: String,
	},
	lname: {
		type: String,
	},
})

module.exports = mongoose.model('Students', studentSchema)
