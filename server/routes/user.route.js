const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const { getUser } = require('../controllers/user.controller')

router.get('/:username', getUser)

module.exports = router
