const express = require('express')
const router = express.Router()
const {
	getAllScholarships,
	getScholarship,
	addScholarship,
	updateScholarship,
	deleteScolarship,
} = require('../controllers/scholarship.controller')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/', verifyJWT, getAllScholarships)
router.get('/:id', verifyJWT, getScholarship)
router.post('/', verifyJWT, addScholarship)
router.put('/:id', verifyJWT, updateScholarship)
router.delete('/:id', verifyJWT, deleteScolarship)

module.exports = router
