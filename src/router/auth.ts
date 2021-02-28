import { Router } from 'express'
import passport from 'passport'
import { _isDev } from '../consts'

import Users from '../models/users'

const router = Router()

router.route('/')
	.get((_, res) => {
		res.json({ Auth: true })
	})

router.post('/signin',
	passport.authenticate('local'),
	(req, res) => {
		res.status(200).json({
			success: true,
			data: req.user
		})
	}
)

router.get('/signout', (req, res) => {
	req.logout();
	res.redirect('/');
});

router.get('/google',
	passport.authenticate('google', {
		scope: ['email', 'profile']
	})
)

router.get('/google/callback',
	passport.authenticate('google', {
		successRedirect: '/?success=true&provider=google',
		failureRedirect: '/auth/google?error=true,message=Unexpected error while signing in!'
	})
)

router.get('/facebook',
	passport.authenticate('facebook')
)

router.get('/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect: '/?success=true&provider=facebook',
		failureRedirect: '/auth/facebook?error=true,message=Unexpected error while signing in!'
	})
)


router.post('/signup', async (req, res) => {

	await Users.init()

	let user = new Users(req.body)

	// let isValid = user.validateSync()

	// console.log('/auth/signup', user, isValid)

	// if (!isValid) return res.json({ error: true, message: 'User not valid' })

	let newUser = await user.save()

	res.json(newUser)
})


export default router