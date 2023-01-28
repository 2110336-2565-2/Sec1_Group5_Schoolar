const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const indexRoute = require('./routes/index')
const usersRoute = require('./routes/users')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => res.send('Hello Schoolar'))
app.use('/', indexRoute)
app.use('/users', usersRoute)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`start server in port ${port}`))
