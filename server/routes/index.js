const express = require('express')
const authRoute = require('./auth.route')
const studentRoute = require('./student.route')
const resetPasswordRoute = require('./resetPassword.route')
const scholarshipRoute = require('./scholarship.route')
const providerRoute = require('./provider.route')
const userRoute = require('./user.route')

const router = express.Router()
router.get('/', (req, res) => {
	res.json({ message: 'Welcome to Scholarship App' })
})
router.use('/auth', authRoute)
router.use('/student', studentRoute)
router.use('/resetPassword', resetPasswordRoute)
router.use('/scholarship', scholarshipRoute)
router.use('/provider', providerRoute)
router.use('/user', userRoute)

module.exports = router
