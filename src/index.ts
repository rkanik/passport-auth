require('dotenv').config()

import express from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import path from 'path'
import passport from './auth/passport'
import router from './router'

import { app, _baseUrl, _port } from './consts';

import { mongodb } from './database'
import { handleError } from './middlewares/error.middleware';

const views = path.join(__dirname, '../client/dist')

app.use('/', express.static(views))

app.use(cors({
	origin: 'http://localhost:8080'
}));
app.use(helmet());
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET || ""
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(router)

app.use(handleError);

app.listen(_port, async () => {

	console.log('\nMode		:', app.get('env'))
	console.log('Server		: Running')
	console.log('URL 		:', _baseUrl)

	await mongodb.connect()
})
