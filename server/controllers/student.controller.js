const Student = require('../models/students')
const User = require('../models/users')
const { validationResult } = require('express-validator')

const handleValidationResult = (result, res) => {
	if (!result.isEmpty()) {
		return res.status(400).json({ errors: result.array() })
	}
}

/*
 * @desc     Get student info
 * @route    GET student/
 * @access   Private
 */
exports.getStudent = async (req, res) => {
	// #swagger.tags = ['student']
	const result = validationResult(req)
	handleValidationResult(result, res)

	try {
		const { username } = req.body
		const user = await User.findOne({ username })
		if (!user) throw new Error('User not found')

		const student = await Student.findOne({ userID: user._id })
		if (!student) throw new Error('Student not found')

		return res.status(200).json({ student })
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}

/*
 * @desc     Update student info
 * @route    PATCH student/
 * @access   Private
 */
exports.updateStudentInfo = async (req, res) => {
	// #swagger.tags = ['student']
	const result = validationResult(req)
	handleValidationResult(result, res)

	try {
		const {
			firstName,
			lastName,
			birthdate,
			gender,
			education,
			householdIncome,
			employment,
			targetNation,
			typeOfScholarship,
			field,
			username,
			email,
			phoneNumber,
		} = req.body

		const user = await User.findOne({ username })
		if (!user) throw new Error('User not found')

		const student = await Student.findOne({ userID: user._id })
		if (!student) throw new Error('Student not found')

		Object.assign(student, {
			firstName,
			lastName,
			birthdate,
			gender,
			education,
			householdIncome,
			employment,
			targetNation,
			typeOfScholarship,
			field,
		})
		Object.assign(user, { email, phoneNumber })

		await user.save()
		await student.save()

		return res.status(200).json({
			message: 'Student information updated successfully',
			student,
		})
	} catch (error) {
		return res.status(400).json({ message: error.message })
	}
}
