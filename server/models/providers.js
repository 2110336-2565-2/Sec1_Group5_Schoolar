const mongoose = require('mongoose')
const { Schema } = mongoose

const providerSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
	},
	schoolar_credit: {
		type: String,
	},
})

module.exports = mongoose.model('Providers', providerSchema)
