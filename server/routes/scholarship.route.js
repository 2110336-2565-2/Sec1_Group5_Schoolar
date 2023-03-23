const express = require('express')
const router = express.Router()
const {
	getAllScholarships,
	getScholarship,
	addScholarship,
	updateScholarship,
} = require('../controllers/scholarship.controller')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/', verifyJWT, getAllScholarships)
router.get('/:id', verifyJWT, getScholarship)
router.post('/', verifyJWT, addScholarship)
router.put('/:id', verifyJWT, updateScholarship)

module.exports = router
