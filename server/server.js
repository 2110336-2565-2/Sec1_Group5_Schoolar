const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
var cookieParser = require('cookie-parser')
require('dotenv').config()

const indexRoute = require('./routes/index')
const authRoute = require('./routes/auth.route')

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
app.use(cors())
app.use(morgan('dev'))

app.use('/', indexRoute)
app.use('/auth', authRoute)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`start server in port ${port}`))
