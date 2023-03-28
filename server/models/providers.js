const mongoose = require('mongoose')
const { Schema } = mongoose

const providerSchema = new Schema(
	{
		username: {
			type: String,
			ref: 'User',
		},
		organizationName: {
			required: true,
			type: String,
			maxLength: 40,
			trim: true,
		},
		address: {
			required: true,
			type: String,
			maxLength: 255,
			lowercase: true,
			trim: true,
		},
		website: {
			required: true,
			type: String,
			maxLength: 250,
			lowercase: true,
			trim: true,
		},
		creditCardNumber: {
			type: String,
			maxLength: 16,
			unique: true,
			trim: true,
			sparse: true,
		},
		nameOnCard: {
			type: String,
			trim: true,
		},
		cardExpiredDate: {
			type: Date,
		},
		cvv: {
			type: Number,
			// maxLength:10
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
)

// Populate with virtuals
providerSchema.virtual('scholarship', {
	ref: 'Scholarships',
	localField: '_id',
	foreignField: 'provider',
	justOne: false,
})

module.exports = mongoose.model('Providers', providerSchema)
