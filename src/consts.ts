import express from 'express'

export const app = express()

export const _isProd = app.get('env') === 'production'
export const _isDev = app.get('env') === 'development'

export const _port = process.env.PORT || '3500'
export const _baseUrl = _isDev
	? `http://localhost:${_port}`
	: 'https://rk-passport-auth.herokuapp.com'

export const _sessionSecret = process.env.SESSION_SECRET || ''
export const _cookieSecret = process.env.COOKIE_SECRET || ''
export const _jwtSecret = process.env.JWT_SECRET || ''

export const _mongodbUri = process.env.MONGO_ATLAS || ''
export const _mongodbUsername = process.env.MONGO_USERNAME || ''
export const _mongodbPassword = process.env.MONGO_PASSWORD || ''
export const _mongodbDbname = process.env.MONGO_DBNAME || ''

export const _googleClientId = process.env.GOOGLE_CLIENT_ID || ''
export const _googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || ''

export const _facebookAppId = process.env.FACEBOOK_APP_ID || ''
export const _facebookAppSecret = process.env.FACEBOOK_APP_SECRET || ''

export const _twitterConsumerKey = process.env.TWITTER_CONSUMER_KEY || ''
export const _twitterConsumerSecret = process.env.TWITTER_CONSUMER_SECRET || ''