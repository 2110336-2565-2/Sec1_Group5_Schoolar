const Student = require('../models/students')
const User = require('../models/users')
const { validationResult } = require('express-validator')
const { toDate } = require('../utils/dateUtils')

const handleValidationResult = (result, res) => {
	if (!result.isEmpty()) {
		return res.status(400).json({ errors: result.array() })
	}
}

/*
 * @desc     Get student info
 * @route    GET student/:username
 * @access   Private
 */
exports.getStudent = async (req, res) => {
	/** #swagger.tags = ['student']
	 *  #swagger.description = 'Get infomation of the given student.'
	 */
	const result = validationResult(req)
	handleValidationResult(result, res)

	try {
		const username = req.params.username

		const user = await User.findOne({ username })
		if (!user) throw new Error('User not found')

		const student = await Student.findOne({ username })
		if (!student) throw new Error('Student not found')

		return res.status(200).json({ student, user })
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}

/*
 * @desc     Update student info
 * @route    PATCH /student
 * @access   Private
 */
exports.updateStudentInfo = async (req, res) => {
	/** #swagger.tags = ['student']
	 *  #swagger.description = 'Update information of the student.'
	 */
	const result = validationResult(req)
	handleValidationResult(result, res)

	try {
		const username = req.params.username
		const {
			firstName,
			lastName,
			birthdate: birthdateString,
			phoneNumber,
			gender,
			gpax,
			degree,
			school,
			program,
			targetNation,
			typeOfScholarship,
			fieldOfInterest,
		} = req.body

		const birthdate = toDate(birthdateString)
		const user = await User.findOne({ username })
		if (!user) throw new Error('User not found')

		const student = await Student.findOne({ username })
		if (!student) throw new Error('Student not found')

		Object.assign(user, { phoneNumber })

		Object.assign(student, {
			firstName,
			lastName,
			birthdate,
			gender,
			school,
			degree,
			program,
			gpax,
			targetNation,
			typeOfScholarship,
			fieldOfInterest,
		})

		await user.save()
		await student.save()
		return res.status(200).json({
			message: 'Student information updated successfully',
			student,
			user,
		})
	} catch (error) {
		console.log(error)
		return res.status(400).json({ message: error.message })
	}
}

/*
 * @desc     Add pin scholarship to student
 * @route    PATCH /student
 * @access   Private
 */
exports.addPinScholarship = async (req, res) => {
	/** #swagger.tags = ['student']
	 *  #swagger.description = 'Pin scholarship for the student.'
	 */
	const result = validationResult(req)
	handleValidationResult(result, res)

	try {
		const username = req.params.username

		const user = await User.findOne({ username })
		if (!user) throw new Error('User not found')

		const student = await Student.findOne({ username })
		if (!student) throw new Error('Student not found')

		const scholarshipID = req.body.scholarshipID
		const updateResult = await Student.updateOne(
			{ username: username },
			{ $addToSet: { pinScholarships: scholarshipID } },
		)

		if (updateResult.nModified === 0) {
			return res.status(404).json({ message: 'Student not found' })
		}
		await student.save()
		return res.status(200).json({ message: 'Scholarship pinned successfully', data: student })
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}

/*
 * @desc     Delete pin scholarship from student database
 * @route    PATCH /student
 * @access   Private
 */
exports.deletePinScholarship = async (req, res) => {
	/** #swagger.tags = ['student']
	 *  #swagger.description = 'Unpin scholarship from the student.'
	 */
	const result = validationResult(req)
	handleValidationResult(result, res)

	try {
		const username = req.params.username

		const user = await User.findOne({ username })
		if (!user) throw new Error('User not found')

		const student = await Student.findOne({ username })
		if (!student) throw new Error('Student not found')

		const scholarshipID = req.body.scholarshipID

		const updateResult = await Student.updateOne(
			{ username: username },
			{ $pull: { pinScholarships: scholarshipID } },
		)

		if (updateResult.nModified === 0) {
			return res.status(404).json({ message: 'Student or scholarship not found' })
		}
		await student.save()
		return res.status(200).json({ message: 'Scholarship unpinned successfully' })
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}

/*
 * @desc     Get student info for recommended scholarships
 * @route    GET /student
 * @access   Private
 */

exports.getStudentInfo = async (req, res) => {
	/** #swagger.tags = ['student']
	 *  #swagger.description = 'Get student information for recommended scholarships.'
	 */
	const result = validationResult(req)
	handleValidationResult(result, res)

	try {
		let studentInfo
		const username = req.params.username
		const user = await User.findOne({ username })
		if (!user) throw new Error('User not found')

		const student = await Student.findOne({ username })
		if (!student) throw new Error('Student not found')

		studentInfo = await Student.find({ username: username }).select({
			username: 1,
			degree: 1,
			targetNation: 1,
			typeOfScholarship: 1,
			gpax: 1,
			program: 1,
			pinScholarships: 1,
		})
		return res.status(200).json({
			message: 'get student information successful',
			data: studentInfo,
		})
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}
