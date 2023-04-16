const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { getNotifications, updateNotification } = require('../controllers/notification.controller')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/', verifyJWT, getNotifications)
router.put('/', verifyJWT, updateNotification)

module.exports = router
