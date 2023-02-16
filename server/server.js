const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
require('dotenv').config()

const indexRoute = require('./routes/index')
const authRoute = require('./routes/auth.route')
const studentRoute = require('./routes/student.route')
const resetPasswordRoute = require('./routes/resetPassword.route')
const scholarshipRoute = require('./routes/scholarship.route')
const providerRoute = require('./routes/provider.route')
const userRoute = require('./routes/user.route')

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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/', indexRoute)
app.use('/auth', authRoute)
app.use('/student', studentRoute)
app.use('/resetPassword', resetPasswordRoute)
app.use('/scholarship', scholarshipRoute)
app.use('/provider', providerRoute)
app.use('/user', userRoute)

const port = process.env.PORT || 8080
app.listen(port, () =>
	console.log(
		`start server in port ${port}\nto update API doc: "npm run swagger-autogen"\nAPI documentation: http://localhost:${port}/api-docs`,
	),
)
