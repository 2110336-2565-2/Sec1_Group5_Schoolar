const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
require('dotenv').config()

const indexRoute = require('./routes/index')
const authRoute = require('./routes/auth.route')
const studentRoute = require('./routes/student.route')

const app = express()

mongoose.set('strictQuery', false)
mongoose
	.connect(process.env.DATABASE, { autoIndex: true })
	.then((result) => {
		console.log('mongoose connected!')
	})
	.catch((err) => console.log(err))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: true, credentials: true }))
app.use(morgan('dev'))

app.use('/', indexRoute)
app.use('/auth', authRoute)
app.use('/student', studentRoute)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`start server in port ${port}`))
