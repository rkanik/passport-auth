import path from 'path'
import status from 'http-status-codes'
import { Router } from 'express'

// Routers
import AuthRouter from './auth'
import UsersRouter from './users'

// Helpers
import { HTTPError } from '../helpers'
import { _isProd } from '../consts'

const router = Router()

router.use('/auth', AuthRouter)
router.use('/api/v1/users', UsersRouter)

const indexHtml = _isProd
	? path.join(__dirname, '../public/index.html')
	: path.join(__dirname, '../../client/dist/index.html')

console.log('\nHTML 		:', indexHtml)

router.get('/api/v1/profile', (req, res) => {
	if (!req.user) throw new HTTPError(
		status.UNAUTHORIZED,
		'Please login first'
	)
	res.status(200).json(req.user)
})

router.get('/', (_, res) => {
	res.sendFile(indexHtml);
})

router.get('/*', (_, res) => {
	res.sendFile(indexHtml);
})

export default router