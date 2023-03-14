const jwt = require('jsonwebtoken')

const BEARER_PREFIX = 'Bearer '

// Middleware function to verify a JWT token
const verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization
	if (!authHeader?.startsWith(BEARER_PREFIX)) {
		return res.sendStatus(401)
	}

	const token = authHeader.split(' ')[1]

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) {
			return res.sendStatus(403)
		}

		req.user = decoded.UserInfo.username
		req.roles = decoded.UserInfo.roles
		next()
	})
}

module.exports = verifyJWT
