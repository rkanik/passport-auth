import mongoose from 'mongoose'

import {
	_mongodbUri,
	_mongodbDbname,
	_mongodbPassword,
	_mongodbUsername
} from '../../consts'

export const connectUri = _mongodbUri
	.replace('<username>', _mongodbUsername)
	.replace('<password>', _mongodbPassword)
	.replace('<dbname>', _mongodbDbname)

export const connectOptions: mongoose.ConnectOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}
