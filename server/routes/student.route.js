const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { getStudent, updateStudentInfo } = require('../controllers/student.controller')
const verifyJWT = require('../middleware/verifyJWT')

router.get(verifyJWT, getStudent)

router.patch(verifyJWT, updateStudentInfo)

module.exports = router
