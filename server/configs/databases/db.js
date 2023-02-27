const mongoose = require('mongoose')

async function connect() {
	try {
		mongoose.set('strictQuery', false)
		await mongoose.connect(process.env.DATABASE, {
			autoIndex: true,
		})
		console.log('Connected to MongoDB')
	} catch (error) {
		console.error('Failed to connect to MongoDB', error)
		process.exit(1)
	}
}

module.exports = { connect }
