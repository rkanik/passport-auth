import mongoose from 'mongoose'
import { connectUri, connectOptions } from './config'

const connect = async () => {
	try {
		await mongoose.connect(
			connectUri,
			connectOptions
		)
		console.log('Database 	: Connected')
	}
	catch (error) {
		console.log('Database	: Connection failed')
		console.log('Database	:', error.message)
	}

}

export default {
	connect
}