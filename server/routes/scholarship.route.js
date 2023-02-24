const express = require('express')
const router = express.Router()
const { getAllScholarships, getScholarship } = require('../controllers/scholarship.controller')

router.get('/', getAllScholarships)
router.get('/:id', getScholarship);

module.exports = router
