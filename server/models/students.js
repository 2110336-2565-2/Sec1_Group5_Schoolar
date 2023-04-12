const mongoose = require('mongoose')
const { Schema } = mongoose

const studentSchema = new Schema({
	username: {
		type: String,
		ref: 'User',
	},
	firstName: {
		required: true,
		type: String,
		trim: true,
	},
	lastName: {
		required: true,
		type: String,
		trim: true,
	},
	birthdate: {
		required: true,
		type: Date,
		trim: true,
	},
	gender: {
		required: true,
		type: String,
		enum: ['Male', 'Female', 'Non-binary'],
	},
	// below this is the criteria for matching
	gpax: {
		type: Number,
	},
	degree: {
		type: String,
		enum: ['', 'High school', 'Bachelor', 'Master', 'Doctoral'],
	},
	school: {
		type: String,
		trim: true,
	},
	program: {
		type: String,
		enum: [
			'',
			'Sci-Math',
			'Art-Math',
			'Art-Language',
			'Art-Society',
			'Art-General',
			'Faculty of Allied Health Sciences',
			'Faculty of Architecture',
			'Faculty of Arts',
			'Faculty of Commerce and Accountancy',
			'Faculty of Communication Arts',
			'Faculty of Dentistry',
			'Faculty of Economics',
			'Faculty of Education',
			'Faculty of Engineering',
			'Faculty of Fine and Applied Arts',
			'Faculty of Law',
			'Faculty of Medicine',
			'Faculty of Nursing',
			'Faculty of Pharmaceutical Sciences',
			'Faculty of Political Science',
			'Faculty of Psychology',
			'Faculty of Science',
			'Faculty of Sports Science',
			'Faculty of Veterinary Science',
		],
	},
	targetNation: {
		type: String,
		maxLength: 60,
		lowercase: true,
		trim: true,
	},
	typeOfScholarship: {
		type: String,
		enum: ['', 'Full', 'Partial', 'Renewable', 'Fellow'],
	},
	fieldOfInterest: {
		type: String,
		trim: true,
	},
	pinScholarships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'scholarship' }],
})

module.exports = mongoose.model('Students', studentSchema)
