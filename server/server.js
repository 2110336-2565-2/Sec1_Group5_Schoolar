const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
const routes = require('./routes')
const { connect } = require('./configs/db')
require('dotenv').config()

const app = express()

connect()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: true, credentials: true }))
app.use(morgan('dev'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/', routes)

const port = process.env.PORT || 8080
app.listen(port, () => {
	console.log(`Server started on port ${port}`)
	console.log(`API documentation: http://localhost:${port}/api-docs`)
})
