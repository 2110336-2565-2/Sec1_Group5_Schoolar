import axios from 'axios'

export const getErrMsg = (field, type, amount, unit = 'characters') => {
	field = field.charAt(0).toUpperCase() + field.slice(1)
	switch (type) {
		case 'required':
			return `${field} is required`
		case 'minLength':
			return `${field} must be at least ${amount} ${unit}`
		case 'maxLength':
			return `${field} must be at most ${amount} ${unit}`
		case 'pattern':
			return `${field} is invalid`
		case 'taken':
			return `${field} has been taken`
		case 'positive':
			return `${field} must be positive`
		case 'notRegister':
			return `${field} is not registered yet`
		case 'upper':
			return `${field} must have at least one uppercase letter`
		case 'lower':
			return `${field} must have at least one lower letter`
		case 'special':
			return `${field} must have at least one digit number or special character`
		case 'space':
			return `${field} must must not contain spaces`
		case 'match':
			return `${field} do not match!`
		default:
			return ''
	}
}

export const getRegEx = (type) => {
	switch (type) {
		case 'username':
			return /^[a-zA-Z0-9._-]+$/
		case 'email':
			return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
		case 'gpax':
			return /^[0-9]*\.[0-9][0-9]$/
		case 'phoneNumber':
			return /^0\d{8,9}$/
		case 'hasUpper':
			return /(?=.*[A-Z])/
		case 'hasLower':
			return /(?=.*[a-z])/
		case 'onlyAlphabet':
			return /^[A-Za-z]+$/
		case 'onlyAlphabetSpace':
			return /^[A-Za-z ]+$/
		case 'onlyAlphabetNumberSpace':
			return /^[A-Za-z0-9 ]+$/
		case 'onlyNumber':
			return /^[0-9]+$/
		case 'hasSpecial':
			return /(?=.*[0-9!"#$%&'()*+,-./:;<=>?@_`{|}~\[\]\\])/
		case 'noSpace':
			return /^\S*$/
		default:
			return /^$/
	}
}

export const isDupe = async (role, field, value) => {
	try {
		const response = await axios.get(`/auth/isDupe/${role}/${field}/${value}`)
		return response.data
	} catch (err) {
		console.log(err)
	}
}

export const getValidation = (field, defaultValue) => {
	// use defaultValue in edit page, to prevent check isDupe when input is not edited
	switch (field) {
		case 'username':
			return {
				required: getErrMsg('Username', 'required'),
				maxLength: { value: 40, message: getErrMsg('username', 'maxLength', 40) },
				pattern: {
					value: getRegEx('username'),
					message: getErrMsg('Username', 'pattern'),
				},
				validate: {
					duplicate: async (value) => {
						if (value === defaultValue) return true //if value is not edited, don't check isDupe
						return !(await isDupe('user', 'username', value)) || getErrMsg('Username', 'taken')
					},
				},
			}
		case 'email':
			return {
				required: getErrMsg('Email', 'required'),
				pattern: {
					value: getRegEx('email'),
					message: getErrMsg('Email', 'pattern'),
				},
				validate: {
					duplicate: async (value) => {
						if (value === defaultValue) return true //if value is not edited, don't check isDupe
						return !(await isDupe('user', 'email', value)) || getErrMsg('Email', 'taken')
					},
				},
			}
		case 'password':
			return {
				required: getErrMsg('Password', 'required'),
				minLength: { value: 8, message: getErrMsg('Password', 'minLength', 8) },
				maxLength: {
					value: 40,
					message: getErrMsg('Password', 'maxLength', 40),
				},
				validate: {
					upper: (value) => getRegEx('hasUpper').test(value) || getErrMsg('Password', 'upper'),
					lower: (value) => getRegEx('hasLower').test(value) || getErrMsg('Password', 'lower'),
					special: (value) => getRegEx('hasSpecial').test(value) || getErrMsg('Password', 'special'),
					space: (value) => getRegEx('noSpace').test(value) || getErrMsg('Password', 'space'),
				},
			}
		case 'phoneNumber':
			return {
				required: getErrMsg('Phone Number', 'required'),
				pattern: {
					value: getRegEx('phoneNumber'),
					message: getErrMsg('Phone Number', 'pattern'),
				},
				minLength: {
					value: 9,
					message: getErrMsg('Phone Number', 'minLength', 9, 'digits'),
				},
				maxLength: {
					value: 10,
					message: getErrMsg('Phone Number', 'maxLength', 10, 'digits'),
				},
				validate: {
					duplicate: async (value) => {
						if (value === defaultValue) return true //if value is not edited, don't check isDupe
						return !(await isDupe('user', 'phoneNumber', value)) || getErrMsg('Phone Number', 'taken')
					},
				},
			}
		// Student
		case 'firstName':
			return {
				required: getErrMsg('First Name', 'required'),
				minLength: {
					value: 2,
					message: getErrMsg('First Name', 'minLength', 2),
				},
				pattern: {
					value: getRegEx('onlyAlphabetSpace'),
					message: getErrMsg('First Name', 'pattern'),
				},
			}
		case 'lastName':
			return {
				required: getErrMsg('Last Name', 'required'),
				minLength: {
					value: 2,
					message: getErrMsg('Last Name', 'minLength', 2),
				},
				pattern: {
					value: getRegEx('onlyAlphabetSpace'),
					message: getErrMsg('Last Name', 'pattern'),
				},
			}
		case 'birthdate':
			return {
				required: getErrMsg('Birth date', 'required'),
				validate: {
					future: (value) => {
						if (typeof value === 'string') {
							//if typing input (20/02/2023)
							const [day, month, year] = value.split('/').map(Number)
							const inputDate = new Date(year, month - 1, day)
							const today = new Date()
							return inputDate < today || getErrMsg('Birthdate', 'pattern')
						} else {
							// using UI to pick date (2023-02-22T17:00:00.000Z), impossible to pick future, no need to validate
							return true
						}
					},
				},
			}
		case 'gender':
			return {
				required: getErrMsg('Gender', 'required'),
			}
		case 'school':
			return {
				pattern: {
					value: getRegEx('onlyAlphabetNumberSpace'),
					message: getErrMsg('School or Univeristy', 'pattern'),
				},
			}
		case 'gpax':
			return {
				required: getErrMsg('GPAX', 'required'),
				pattern: {
					value: getRegEx('gpax'),
					message: 'GPAX must be float number with 2 digits',
				},
				min: { value: 0, message: getErrMsg('GPAX', 'positive') },
				max: { value: 4, message: 'GPAX must be at most 4' },
			}
		case 'targetNation':
			return {
				required: getErrMsg('Target Nation', 'required'),
				pattern: {
					value: getRegEx('onlyAlphabetNumberSpace'),
					message: getErrMsg('Target Nation', 'pattern'),
				},
			}
		case 'fieldOfInterest':
			return {
				required: getErrMsg('Field of Interest', 'required'),
				pattern: {
					value: getRegEx('onlyAlphabetNumberSpace'),
					message: getErrMsg('Field of Interest', 'pattern'),
				},
			}
		// Provider
		case 'scholarshipName':
			return{
				required: getErrMsg('Scholarship Name', 'required'),
				minLength: { value: 2, message: getErrMsg('Scholarship Name', 'minLength', 2) },
				maxLength: { value: 40, message: getErrMsg('Scholarship Name', 'maxLength', 40) },
				pattern: {
					value: getRegEx('onlyAlphabetNumberSpace'),
					message: getErrMsg('Scholarship Name', 'pattern'),
				},
			}
		case 'organizationName':
			return {
				required: getErrMsg('Organization Name', 'required'),
				minLength: { value: 2, message: getErrMsg('Organization Name', 'minLength', 2) },
				maxLength: { value: 40, message: getErrMsg('Organization Name', 'maxLength', 40) },
				pattern: {
					value: getRegEx('onlyAlphabetNumberSpace'),
					message: getErrMsg('Organization Name', 'pattern'),
				},
			}
		case 'website':
			return {
				required: getErrMsg('Website', 'required'),
				minLength: { value: 2, message: getErrMsg('Website', 'minLength', 2) },
				maxLength: { value: 250, message: getErrMsg('Website', 'maxLength', 250) },
			}
		case 'creditCardNumber':
			return {
				required: getErrMsg('Credit Card Number', 'required'),
				minLength: { value: 16, message: 'Credit Card Number must be 16 digits' },
				maxLength: { value: 16, message: 'Credit Card Number must be 16 digits' },
				pattern: {
					value: getRegEx('onlyNumber'),
					message: 'Credit Card Number contains invalid character',
				},
			}
		case 'address':
			return {
				required: getErrMsg('Address', 'required'),
				minLength: { value: 2, message: getErrMsg('Address', 'minLength', 2) },
				maxLength: {
					value: 255,
					message: getErrMsg('Address', 'maxLength', 255),
				},
			}
		case 'degree':
			return{
				required: getErrMsg('Degree', 'required')
			}
		case 'program':
			return{
				required: getErrMsg('Program', 'required')
			}
		case 'faculty':
			return{
				required: getErrMsg('Faculty', 'required')
			}
    	case 'amount':
			return {
				minLength: {
					value: 3,
					message: getErrMsg('Amount', 'minLength', 3, 'digits'),
				},
				maxLength: {
					value: 10,
					message: getErrMsg('Amount', 'maxLength', 10, 'digits'),
				},
				pattern: {
					value: getRegEx('onlyNumber'),
					message: 'Amout Number contains invalid character',
				},
			}
		case 'quota':
			return {
				pattern: {
					value: getRegEx('onlyNumber'),
					message: 'Quota Number contains invalid character',
				},
			}
		case 'applicationDeadline':
			return{
				validate: {
					past: (value) => {
						if (typeof value === 'string') {
							//if typing input (20/02/2023)
							const [day, month, year] = value.split('/').map(Number)
							const inputDate = new Date(year, month - 1, day)
							const today = new Date()
							return inputDate > today || getErrMsg('Application Deadline', 'pattern')
						} else {
							// using UI to pick date (2023-02-22T17:00:00.000Z), impossible to pick future, no need to validate
							return true
						}
					},
				}
			}
		case 'typeOfScholarship':
			return{
				required: getErrMsg('Type of Scholarship', 'required')
			}
		default:
			return {}
	}
}
