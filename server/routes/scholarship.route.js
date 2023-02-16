const express = require('express')
const router = express.Router()
const { getAllScholarships } = require('../controllers/scholarship.controller')

router.get('/', getAllScholarships)

module.exports = router
