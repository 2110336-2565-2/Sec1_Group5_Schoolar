const mongoose = require('mongoose')
const { Schema } = mongoose

const scholarshipSchema = new Schema({
	scholarshipName: {
		required: true,
		type: String,
		lowercase: true,
		trim: true,
	},
	provider: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Provider',
	},
	degree: {
		required: true,
		type: String,
		enum: ['high school', 'bachelor', 'master', 'doctoral'],
	},
	gpax: {
		required: true,
		type: Number,
	},
	program: {
		required: true,
		type: String,
		enum: [
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
	fieldOfInterest: {
		required: true,
		type: String,
		index: true,
		trim: true,
	},
	applicationDeadline: {
		type: Date,
	},
	paymentDueDate: {
		required: true,
		type: Date,
	},
	paymentStatus: {
		required: true,
		type: Boolean,
	},
	quota: {
		type: Number,
	},
	amount: {
		type: Number,
	},
	detail: {
		type: String,
	},
})

module.exports = mongoose.model('Scholarships', scholarshipSchema)
