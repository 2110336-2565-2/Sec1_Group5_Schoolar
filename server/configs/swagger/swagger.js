const swaggerAutogen = require('swagger-autogen')()

const doc = {
	info: {
		title: 'Schoolar',
	},
	host: `localhost:${process.env.PORT || 8080}`,
	schemes: ['http'],
}

const outputFile = './swagger.json'
const endpointsFiles = ['./server.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
