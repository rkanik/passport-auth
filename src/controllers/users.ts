import status from 'http-status-codes'
import { Users } from '../models'
import { handleRequest, error, success } from '../helpers'

const users = {
	get: handleRequest(async () => {
		let users = await Users.find()
		return success({
			page: 1,
			limit: 10,
			length: users.length,
			data: users
		})
	})
}

const user = {
	delete: handleRequest(async req => {

		let data = await Users.deleteOne({
			_id: req.params._id
		})

		if (data.deletedCount === 0)
			return error(
				status.INTERNAL_SERVER_ERROR,
				'Error deleting user!'
			)

		return success({
			ok: data.ok,
			deletedCount: data.deletedCount
		})
	})
}

export { user, users }