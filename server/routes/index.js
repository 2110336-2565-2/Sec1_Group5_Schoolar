const express = require('express')
const verifyJWT = require('../middleware/verifyJWT')
const router = express.Router()

// Test JWT
router.get('/', verifyJWT, (req, res) => res.send('Hello Schoolar'))

module.exports = router
