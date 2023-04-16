const Scholarship = require('../models/scholarship')
const Provider = require('../models/providers')
const { toDate } = require('../utils/dateUtils')

/*
 * @desc     Get all scholarships
 * @route    GET /scholarship
 * @access   Private
 */
exports.getAllScholarships = async (req, res) => {
	/** #swagger.tags = ['scholarship']
	 *  #swagger.description = 'Get all scholarships.'
	 */
	try {
		let scholarships
		if (req.role === 'provider') {
			const username = req.user
			const provider = await Provider.findOne({ username })
			scholarships = await Scholarship.find({ provider })
		} else {
			scholarships = await Scholarship.find({ status: true })
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
 * @desc     Get a scholarship by scholarship id
 * @route    GET /scholarship/:id
 * @access   Private
 */
exports.getScholarship = async (req, res) => {
	/** #swagger.tags = ['scholarship']
	 *  #swagger.description = 'Get a scholarship by scholarship id.'
	 */
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
 * @route    POST /scholarship
 * @access   Private
 */
exports.addScholarship = async (req, res) => {
	/** #swagger.tags = ['scholarship']
	 *  #swagger.description = 'Add scholarship for the provider with the required field.'
	 */
	try {
		const {
			scholarshipName,
			degree,
			gpax,
			program,
			targetNation,
			typeOfScholarship,
			fieldOfInterest,
			applicationDeadline: applicationDeadlineString,
			quota,
			amount,
			detail,
		} = req.body

		const applicationDeadline = toDate(applicationDeadlineString)

		// Find the provider
		const username = req.user
		const provider = await Provider.findOne({ username })
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
			scholarshipName,
			provider,
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
		})
		await scholarship.save()

		// Add message to unreaded notification
		provider.notification.unreaded.push({
			message: `Scholarship not activate: ${scholarship.scholarshipName}`,
			timestamp: Date.now(),
		})
		await provider.save()

		res.status(200).json({ message: 'Scholarship added successfully' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'Error adding scholarship' })
	}
}

/*
 * @desc     Update a specific scholarship
 * @route    PUT /scholarship/:id
 * @access   Private
 */
exports.updateScholarship = async (req, res) => {
	/** #swagger.tags = ['scholarship']
	 *  #swagger.description = 'Update feilds of a specific scholarship.'
	 */
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

/*
 * @desc     Delete scholarship
 * @route    DELETE /scholarship/:id
 * @access   Private
 */
exports.deleteScolarship = async (req, res, next) => {
	/** #swagger.tags = ['scholarship']
	 *  #swagger.description = 'Delete a scholarship by scholarship id.'
	 */
	try {
		let scolarship = await Scholarship.findById(req.params.id)
		if (!scolarship) {
			return res.status(404).json({
				success: false,
				message: `No scolarship with the id of ${req.params.id}`,
			})
		}
		const username = req.user
		const provider = await Provider.findOne({ username })
		if (scolarship.provider.toString() !== provider.id) {
			return res.status(401).json({
				success: false,
				message: `User ${req.user.id} is not authorized to delete this scolarship`,
			})
		}
		await scolarship.remove()
		return res.status(200).json({ success: true, data: {} })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ success: false, message: 'Cannot delete scolarship' })
	}
}
