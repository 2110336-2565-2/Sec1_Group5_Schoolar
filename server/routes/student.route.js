const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { getStudent, updateStudentInfo } = require('../controllers/student.controller')

router.get(getStudent)

router.patch(updateStudentInfo)

module.exports = router
