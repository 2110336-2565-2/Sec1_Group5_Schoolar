const Student = require('../models/students')
const User = require('../models/users')

exports.getStudent = async (req, res) => {
	const result = validationResult(req)
	if (!result.isEmpty()) {
		res.status(400).json({ errors: result.array() })
	} else {
		try {
			const { username } = req.body
			const user = await User.findOne({ username })
			if (!user) throw new Error('User not found')

			const student = await Student.findOne({ userID: user._id })
			if (!student) throw new Error('Student not found')

			return res.status(200).json({
				student,
			})
		} catch (error) {
			return res.status(400).json({
				message: error.message,
			})
		}
	}
}

exports.updateStudentInfo = async (req, res) => {
	const result = validationResult(req)
	if (!result.isEmpty()) {
		res.status(400).json({ errors: result.array() })
	} else {
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

			student.firstName = firstName
			student.lastName = lastName
			student.bd = bd
			student.gender = gender
			student.education = education
			student.householdIncome = householdIncome
			student.employment = employment
			student.targetNation = targetNation
			student.typeOfScholarship = typeOfScholarship
			student.field = field

			user.email = email
			user.phoneNumber = phoneNumber

			await user.save()
			await student.save()

			return res.status(200).json({
				message: 'Student information updated successfully',
				student,
			})
		} catch (error) {
			return res.status(400).json({
				message: error.message,
			})
		}
	}
}
