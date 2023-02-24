const mongoose = require('mongoose')
const { Schema } = mongoose

const studentSchema = new Schema({
	userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
		maxLength: 10,
		trim: true,
	},
	gender: {
		required: true,
		type: String,
		enum: ['male', 'female', 'non-binary'],
	},
	phoneNumber: {
		required: true,
		type: String,
		maxLength: 10,
		unique: true,
		trim: true,
	},
	// below this is the criteria for matching
	gpax: {
		type: Number,
	},
	degree: {
		type: String,
		enum: ['', 'high school', 'bachelor', 'master', 'doctoral'],
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
			'Art-Cal',
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
		index: true,
		lowercase: true,
		trim: true,
	},
	typeOfScholarship: {
		type: String,
		enum: ['', 'full', 'partial', 'renewable', 'fellow'],
		index: true,
	},
	fieldOfInterest: {
		type: String,
		trim: true,
	},
	pinScolarship: {
		// type:
	},
})

module.exports = mongoose.model('Students', studentSchema)
