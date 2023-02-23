const User = require('../models/users')
const { validationResult } = require('express-validator')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const handleValidationResult = (result, res) => {
	if (!result.isEmpty()) {
		return res.status(400).json({ errors: result.array() })
	}
}

// @desc        reset password
// @route       PUT /resetPassword/password
// @access      public
exports.resetPassword = async (req, res) => {
	// #swagger.tags = ['reset password']
	const result = validationResult(req)
	handleValidationResult(result, res)

	const { password } = req.body
	const token = req.headers.authorization.split(' ')[1]

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findOne({ email: decoded.email })

		if (!user) {
			return res.status(400).send({ error: 'Invalid email' })
		}

		user.password = password
		user.resetPasswordToken = null
		await user.save()

		return res.status(200).send({ message: 'Password has been updated' })
	} catch (error) {
		console.error(error)
		return res.status(400).send({ error: 'Invalid token' })
	}
}

// @desc        send email for reset password
// @route       PUT /resetPassword/email
// @access      public
exports.sendEmailResetPassword = async (req, res) => {
	// #swagger.tags = ['reset password']
	const { email } = req.body

	const user = await User.findOne({ email })

	if (!user) {
		return res.status(400).send({ error: 'Invalid email' })
	}

	const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
	const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`

	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: 587,
		secure: false,
		auth: {
			user: process.env.SCHOOLAR_EMAIL,
			pass: process.env.SCHOOLAR_EMAIL_PASSWORD,
		},
	})

	const mailOptions = {
		from: process.env.SCHOOLAR_EMAIL,
		to: email,
		subject: 'Reset password',
		html: `
      <p>Hi,</p>
      <p>We received a request to reset the password for your account. If you did not make this request, you can ignore this email.</p>
      <p>To reset your password, click on the following link:</p>
      <p><a href="${resetLink}">Reset password</a></p>
      <p>This link will expire in 15 minutes.</p>
      <p>Best regards,</p>
      <p>SCHOOLAR</p>
    `,
	}

	try {
		await transporter.sendMail(mailOptions)
		return res.send({
			message: 'An email has been sent with instructions to reset your password',
		})
	} catch (error) {
		console.error(error)
		return res.status(500).send({ error: 'Failed to send email' })
	}
}
