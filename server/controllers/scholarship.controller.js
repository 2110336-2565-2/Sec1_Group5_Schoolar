const Scholarship = require('../models/scholarship')
const Provider = require('../models/providers')

/*
 * @desc     Get all scholarships
 * @route    GET scholarship
 * @access   Private
 */
exports.getAllScholarships = async (req, res) => {
	// #swagger.tags = ['scholarship']
	try {
		let scholarships
		if (req.roles === 'provider') {
			const username = req.user
			const provider = await Provider.findOne({ username })
			scholarships = await Scholarship.find({ provider })
		} else {
			scholarships = await Scholarship.find()
		}
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

/*
 * @desc     Get single scholarship
 * @route    GET scholarship/:id
 * @access   Private
 */
exports.getScholarship = async (req, res) => {
	// #swagger.tags = ['scholarship']
	try {
		const scholarship = await Scholarship.findById(req.params.id)
		if (!scholarship) return res.status(200).json({ success: false })
		res.status(200).json({ success: true, data: scholarship })
	} catch (err) {
		res.status(400).json({ success: false })
	}
}

/*
 * @desc     Add scholarship
 * @route    POST scholarship
 * @access   Private
 */
exports.addScholarship = async (req, res) => {
	try {
		const {
			organizationName,
			scholarshipName,
			degree,
			gpax,
			program,
			targetNation,
			typeOfScholarship,
			fieldOfInterest,
			applicationDeadline,
			quota,
			amount,
			detail,
		} = req.body

		// Find the provider by organizationName
		const provider = await Provider.findOne({ organizationName })
		if (!provider) throw new Error('Provider not found')

		// Validate input data
		if (
			!scholarshipName ||
			!degree ||
			!gpax ||
			!program ||
			!targetNation ||
			!typeOfScholarship ||
			!fieldOfInterest
		) {
			return res.status(400).json({ error: 'Missing scholarship information' })
		}

		const isValidDegree = ['high school', 'bachelor', 'master', 'doctoral'].includes(degree)
		const isValidProgram = [
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
		].includes(program)
		const isValidTypeOfScholarship = ['full', 'partial', 'renewable', 'fellow'].includes(
			typeOfScholarship,
		)

		if (!isValidDegree || !isValidProgram || !isValidTypeOfScholarship) {
			return res.status(400).json({ error: 'Invalid scholarship information' })
		}

		// Create new scholarship object
		const scholarship = new Scholarship({
			scholarshipName: scholarshipName.toLowerCase().trim(),
			provider,
			degree,
			gpax,
			program,
			targetNation: targetNation.toLowerCase().trim(),
			typeOfScholarship,
			fieldOfInterest: fieldOfInterest.trim(),
			applicationDeadline,
			quota,
			amount,
			detail,
		})
		await scholarship.save()
		res.status(200).json({ message: 'Scholarship added successfully' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'Error adding scholarship' })
	}
}

/*
 * @desc     Update scholarship
 * @route    PUT scholarship/:id
 * @access   Private
 */
exports.updateScholarship = async (req, res) => {
	try {
		const { id } = req.params
		const { quota, amount, detail } = req.body

		// find and update the scholarship in the database
		const scholarship = await Scholarship.findByIdAndUpdate(
			id,
			{ $set: { quota, amount, detail } },
			{ new: true },
		)

		// check if the scholarship was found
		if (!scholarship) {
			return res.status(404).json({ message: 'Scholarship not found' })
		}
		res.status(200).json({ message: 'Scholarship updated successfully' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error updating scholarship' })
	}
}
