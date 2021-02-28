import { Router } from 'express'
import { users, user } from '../controllers/users'

const router = Router()

router.route('/').get(users.get)

router.route('/:_id')
	.delete(user.delete)

export default router