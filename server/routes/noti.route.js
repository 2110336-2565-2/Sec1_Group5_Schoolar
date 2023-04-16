const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const { getNotifications, updateNotification } = require('../controllers/noti.controller')
const verifyJWT = require('../middleware/verifyJWT')

router.get('/notifications', verifyJWT, getNotifications)
router.put('/notifications', verifyJWT, updateNotification)

module.exports = router
