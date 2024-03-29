const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {
	getStudent,
	updateStudentInfo,
	addPinScholarship,
	deletePinScholarship,
	getStudentInfo,
} = require('../controllers/student.controller')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/:username', verifyJWT, getStudent)
router.get('/student-info/:username', verifyJWT, getStudentInfo)
router.patch('/:username', verifyJWT, updateStudentInfo)
router.patch(
	'/',
	[
		body('firstName')
			.isLength({ min: 1 })
			.withMessage('First Name is Required')
			.matches(/^[a-zA-Z]*$/)
			.withMessage('First Name contains invalid characters'),
		body('lastName')
			.isLength({ min: 1 })
			.withMessage('Last Name is Required')
			.matches(/^[a-zA-Z]*$/)
			.withMessage('Last Name contains invalid characters'),
		body('gender')
			.isLength({ min: 1 })
			.withMessage('Gender is required')
			.isIn(['Male', 'Female', 'Non-binary'])
			.withMessage('Gender is invalid'),
		body('birthdate')
			.isLength({ min: 1 })
			.withMessage('Birthdate is required')
			.isISO8601()
			.toDate()
			.withMessage('Birthdate is not in correct format'),
		body('householdIncome')
			.matches(/^[0-9]*$]/)
			.withMessage('Household income must contain only numeric characters'),
		body('targetNation')
			.isLength({ max: 60 })
			.withMessage('Target Nation must be at most 60 characters'),
		body('typeOfScholarship')
			.isIn(['Full Scholarship', 'Partial Scholarship', 'Reneable Scholarship', 'Followship'])
			.withMessage('Type of Scholarship is invalid'),
		body('field').isLength({ min: 1 }).withMessage('Field of interest is required'),
	],
	updateStudentInfo,
)

router.patch('/pin-scholarship/:username', verifyJWT, addPinScholarship)
router.patch('/unpin-scholarship/:username', verifyJWT, deletePinScholarship)

module.exports = router
