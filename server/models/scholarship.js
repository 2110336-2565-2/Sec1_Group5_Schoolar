const mongoose = require('mongoose')
const { Schema } = mongoose

const scholarshipSchema = new Schema({
	scholarshipName: {
		required: true,
		type: String,
		trim: true,
		maxLength: 250,
	},
	provider: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Provider',
	},
	degree: {
		required: true,
		type: String,
		enum: ['High School', 'Bachelor', 'Master', 'Doctoral'],
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
		lowercase: true,
		trim: true,
	},
	typeOfScholarship: {
		required: true,
		type: String,
		enum: ['Full Scholarship', 'Partial Scholarship', 'Renewable Scholarship', 'Fellowship'],
	},
	fieldOfInterest: {
		required: true,
		type: String,
		trim: true,
	},
	applicationDeadline: {
		type: Date,
	},
	paymentDueDate: {
		type: Date,
	},
	paymentStatus: {
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
	subscription: {
		//subscription id from stripe (prefix 'sub_')
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	status: {
		type: Boolean,
		default: false,
	},
})

module.exports = mongoose.model('Scholarships', scholarshipSchema)
