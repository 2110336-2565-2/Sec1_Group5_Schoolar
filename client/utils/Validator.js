export const validator = (values, fieldName) => {
	let errors = {}
	switch (fieldName) {
		case 'username':
			validateUsername(values.username, errors)
			break
		case 'email':
			validateEmail(values.email, errors)
			break
		case 'password':
			validatePassword(values.password, errors)
			break
		default:
	}
	return errors
}

function validateUsername(username, errors) {
	if (!username) {
		errors.username = 'Username is Required'
		return false
	}
	if (username.length > 40) {
		errors.username = 'Username must be at most 40 characters'
		return false
	}
	const char = /^[a-zA-Z0-9._-]*$/
	if (!char.test(username)) {
		errors.username = 'Username contain invalid charactor'
		return false
	}
}
function validateEmail(email, errors) {
	if (!email) {
		errors.email = 'Email is Required'
		return false
	} else {
		const re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if (!re.test(String(email).toLowerCase())) errors.email = 'Invalid Email address'
	}
	return true
}

function validatePassword(pass, errors) {
	if (!pass) {
		errors.password = 'Password is Required'
		return false
	}
	const upper = /(?=.*[A-Z])(?=.*\d)(^\S*$)/
	if (!upper.test(pass)) {
		errors.password = 'Password must have at least one uppercase letter'
		return false
	}
	const digit = /(?=.*\d)/
	if (!digit.test(pass)) {
		errors.password = 'Password must have at least one digit number'
		return false
	}
	const space = /^\S*$/
	if (!space.test(pass)) {
		errors.password = 'Password must not contain spaces'
		return false
	}
	if (pass.length < 8) {
		errors.password = 'Password must be at least 8 characters'
		return false
	}
	if (pass.length > 40) {
		errors.password = 'Password must be at most 40 characters'
		return false
	}

	return true
}
