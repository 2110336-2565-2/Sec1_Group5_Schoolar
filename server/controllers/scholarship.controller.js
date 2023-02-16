const Scholarship = require('../models/scholarship')

/*
 * @desc     Get all scholarships
 * @route    GET scholarship/
 * @access   Private
 */
exports.getAllScholarships = async (req, res) => {
	// #swagger.tags = ['scholarship']
	try {
		const scholarships = await Scholarship.find()
		return res.status(200).json({
			success: true,
			count: scholarships.length,
			data: scholarships,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
		})
	}
}
