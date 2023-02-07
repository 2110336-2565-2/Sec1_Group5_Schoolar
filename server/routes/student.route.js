const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { getStudent, updateStudentInfo } = require('../controllers/student.controller')

router.get(getStudent)

router.put(updateStudentInfo)

module.exports = router
