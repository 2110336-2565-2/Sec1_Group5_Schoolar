const request = require('supertest')
const app = require('../../server')
const axios = require('axios')
const { connect } = require('../../configs/databases/db')
// model
const User = require('../../models/users')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

// Mock the User model
jest.mock('../../models/users')
// Mock the bcrypt module
jest.mock('bcrypt', () => {
	return {
		hash: jest.fn(),
		compare: jest.fn(),
	}
})

// Exist User : username , Correct Password
const user1 = {
	username: 'Provider01',
	password: 'Provider01',
}
// Exist User : user-email , Correct Password
const user2 = {
	username: 'Provider01@gmail.com',
	password: 'Provider01',
}
// Exist User, Incorrect Password
const user3 = {
	username: 'Provider01',
	password: 'Provider02',
}

//Nonexist user
const nonExistentUser = {
	username: 'NonExistentUser',
	password: 'NonExistentUser',
}
const refreshToken = 'refreshToken123'
const foundUser = {
	usernameEmail: 'Provider01',
	password: 'Provider01',
	refreshToken: user1.refreshToken,
	save: jest.fn().mockResolvedValue({ ...user1, refreshToken }),
}

describe('POST auth/login', () => {
	describe('when request is invalid', () => {
		let res
		it('should return 400 with validation error messages', async () => {
			response = await request(app).post('/auth/login').send({})

			expect(response.statusCode).toBe(400)
			expect(response.body).toEqual({ message: expect.any(Array) })
		})
	})
	describe('Login with Correct username, Incorrect Password', () => {
		let res
		beforeAll(async () => {
			User.findOne = jest.spyOn(User, 'findOne').mockReturnValue({
				select: jest
					.fn()
					.mockResolvedValue({ usernameEmail: user3.username, password: user3.password }),
			})

			res = await request(app).post('/auth/login').send({
				usernameEmail: user3.username,
				password: user3.password,
			})
		})

		afterAll(() => {
			User.findOne.mockRestore()
		})

		it('Should call User.findOne with correct arguments', () => {
			expect(User.findOne).toHaveBeenCalledWith({
				username: user3.username,
			})
		})

		it('Should return status code 401', async () => {
			expect(res.statusCode).toEqual(401)
		})

		it('Should return the message "Not match"', async () => {
			expect(res.body.message).toEqual('Not match')
		})
	})
	describe('Login with Correct email, Incorrect Password', () => {
		let res
		beforeAll(async () => {
			User.findOne = jest.spyOn(User, 'findOne').mockReturnValue({
				select: jest
					.fn()
					.mockResolvedValue({ usernameEmail: user2.username, password: user2.password }),
			})

			res = await request(app).post('/auth/login').send({
				usernameEmail: user2.username,
				password: user2.password,
			})
		})

		afterAll(() => {
			User.findOne.mockRestore()
		})

		it('Should call User.findOne with correct arguments', () => {
			expect(User.findOne).toHaveBeenCalledWith({
				email: user2.username,
			})
		})

		it('Should return status code 401', async () => {
			expect(res.statusCode).toEqual(401)
		})

		it('Should return the message "Not match"', async () => {
			expect(res.body.message).toEqual('Not match')
		})
	})
	describe('Login with invalid username', () => {
		let res
		beforeAll(async () => {
			User.findOne = jest.spyOn(User, 'findOne').mockReturnValue({
				select: jest.fn().mockReturnValue(null),
			})

			res = await request(app).post('/auth/login').send({
				usernameEmail: nonExistentUser.username,
				password: nonExistentUser.password,
			})
		})

		it('Should call User.findOne with correct arguments', () => {
			expect(User.findOne).toHaveBeenCalledWith({
				username: nonExistentUser.username,
			})
		})

		it('Should return status code 401', () => {
			expect(res.statusCode).toEqual(401)
		})

		it('Should return the message "Not found user"', () => {
			expect(res.body.message).toEqual('Not found user')
		})
	})
	describe('Login with Correct username, Correct password', () => {
		let res
		beforeAll(async () => {
			User.findOne = jest.spyOn(User, 'findOne').mockReturnValue({
				select: jest.fn().mockResolvedValue({ ...foundUser }),
			})
			jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true))

			res = await request(app).post('/auth/login').send({
				usernameEmail: user1.username,
				password: user1.password,
			})
		})

		afterAll(() => {
			User.findOne.mockRestore()
		})

		it('Should call User.findOne with correct arguments', () => {
			expect(User.findOne).toHaveBeenCalledWith({
				username: user1.username,
			})
		})

		it('Should save accessToken to database', () => {
			expect(foundUser.save).toHaveBeenCalledTimes(1)
		})
		it('Should return cookie', () => {
			expect(res.header['set-cookie'][0]).toMatch(/^jwt=.+/)
			expect(res.header['set-cookie'][0]).toMatch(/HttpOnly/)
		})
	})
})
