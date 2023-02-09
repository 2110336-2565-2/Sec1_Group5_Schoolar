const Student = require('../models/students')
const User = require('../models/users')

const handleValidationResult = (result, res) => {
	if (!result.isEmpty()) {
		return res.status(400).json({ errors: result.array() })
	}
}

/*
 * @desc     Get a student info
 * @route    Get /student
 * @access   Private
 */
exports.getStudent = async (req, res) => {
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
 * @desc     Update Student Info
 * @route    PATCH /student
 * @access   Private
 */
exports.updateStudentInfo = async (req, res) => {
	const result = validationResult(req)
	handleValidationResult(result, res)

	try {
		const {
			firstName,
			lastName,
			bd,
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
			bd,
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
