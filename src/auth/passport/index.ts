import passport from 'passport'
import { CallbackError } from 'mongoose';

import {
	localStrategy,
	googleStrategy,
	twitterStratefy,
	facebookStratefy
} from './stategies'

import Users from '../../models/users'

// Stategies
passport.use(localStrategy)
passport.use(googleStrategy)
passport.use(twitterStratefy)
passport.use(facebookStratefy)

passport.serializeUser((user: any, done) => {
	done(null, user._id);
});

passport.deserializeUser(function (id, done) {
	Users.findById(id, (err: CallbackError, user: Document) => {
		console.log('deserializeUser', user)
		done(err, user);
	});
});

export default passport