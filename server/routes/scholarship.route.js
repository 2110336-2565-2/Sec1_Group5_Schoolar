const express = require('express')
const router = express.Router()
const { getAllScholarships } = require('../controllers/scholarship.controller')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/', verifyJWT, getAllScholarships)

module.exports = router
