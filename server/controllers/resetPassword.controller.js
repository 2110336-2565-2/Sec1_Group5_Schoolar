const User = require('../models/users')
const { validationResult } = require('express-validator')

const handleValidationResult = (result, res) => {
	if (!result.isEmpty()) {
		return res.status(400).json({ errors: result.array() })
	}
}

exports.resetPassword('/reset-password', async (req, res) => {
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

    // Return a JWT token
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // res.send({ token });
  });