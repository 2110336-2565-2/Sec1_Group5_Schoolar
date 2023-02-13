const User = require('../models/users')
const { validationResult } = require('express-validator')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

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
    
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ error: 'Invalid email' });

    // Update the user password
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    return res.status(200).send({ message: 'Password has been updated' });

    // Return a JWT token
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // res.send({ token });
};

// @desc        send email for reset password
// @route       PUT /resetPassword/email
// @access      public
// Route to generate a reset password token
exports.sendEmailResetPassword = async (req, res) => {
    // #swagger.tags = ['reset password']
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ error: 'Invalid email' });

    // Generate a reset password token
    // user.resetPasswordToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15 minutes' });
    // user.resetPasswordExpires = Date.now() + 900000;
    // await user.save();

    // Send a reset password email
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,       // use smtp-mail.outlook.com
        port: 587,
        secure: false,
        auth: {
            user: process.env.SCHOOLAR_EMAIL,           // create hotmail for Schoolar
            pass: process.env.SCHOOLAR_EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.SCHOOLAR_EMAIL,
        to: email,
        subject: 'Reset password',
        html: `
        <p>Hi,</p>
        <p>We received a request to reset the password for your account. If you did not make this request, you can ignore this email.</p>
        <p>To reset your password, click on the following link:</p>
        <p><a href="${process.env.FRONTEND_URL}/reset-password?token=${user.resetPasswordToken}">Reset password</a></p>
        <p>This link will expire in 15 minutes.</p>
        <p>Best regards,</p>
        <p>SCHOOLAR</p>
        `
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.status(500).send({ error: 'Failed to send email' });
        }
        console.log('Email sent: ' + info.response);
        res.send({ message: 'An email has been sent with instructions to reset your password' });
    });
}