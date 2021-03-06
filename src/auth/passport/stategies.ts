import jwt from 'jsonwebtoken'

import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import { Strategy as FacebookStrategy } from 'passport-facebook'

import Users from '../../models/users'
import { comparePassword } from '../../helpers';
import { facebookConfig, googleConfig, twitterConfig } from './configs';

export const localStrategy = new LocalStrategy(async (username, password, done) => {
	try {
		let user = await Users
			.findOne({ username })
			.select('username provider password')

		console.log('LocalStrategy', user)

		if (!user) return done(null, false, { message: 'Incorrect username.' });
		if (!user.password) return done(null, false, { message: 'Password is not set.' })

		if (!(await comparePassword(user.password, password))) {
			return done(null, false, { message: 'Incorrect password.' });
		}

		return done(null, user);
	}
	catch (err) { return done(err) }
})

export const googleStrategy = new GoogleStrategy(googleConfig,
	async (request, accessToken, refreshToken, profile, done) => {

		let existUser = await Users.findOne({ email: profile._json.email }).select("-__v")
		console.log('existUser', existUser)

		if (existUser) {
			let token = jwt.sign({ _id: existUser._id }, process.env.JWT_SECRET || "")
			console.log(token)
			Users.updateOne({ _id: existUser._id }, { lastVisited: Date.now() })
			// @ts-ignore
			return done(null, existUser._doc, "User already exist!")
		}

		let user = new Users({
			username: profile.displayName.replace(/ /g, '').toLocaleLowerCase(),
			name: profile.displayName,
			email: profile._json.email,
			emailVerified: profile._json.email_verified,
			externalId: profile.id,
			provider: profile.provider,
			thumbnail: profile._json.picture,
			password: ''
		})

		let isError = user.validateSync()
		console.log('isError', isError)
		if (isError !== undefined) {
			return done(undefined, undefined, "User validation error!")
		}

		await Users.init()

		user.save()
			.then(newUser => {
				console.log("User created successfully!")
				let token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET || '')
				console.log(token)
				done(undefined, newUser, "User created successfully!")
			})
			.catch(err => {
				console.log(err.message)
				done(err, undefined, err.message)
			})
	}
)

export const twitterStratefy = new TwitterStrategy(twitterConfig,
	(token, tokenSecret, profile, done) => {
		return done(false, profile)
	}
)

export const facebookStratefy = new FacebookStrategy(facebookConfig,
	(accessToken, refreshToken, profile, done: any) => {
		console.log('facebookStratefy', profile)
		return done(false, profile)
	}
)