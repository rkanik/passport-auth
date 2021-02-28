import mongoose from 'mongoose'
import { connectUri, connectOptions } from './config'

const connect = async () => {
	try {
		await mongoose.connect(
			connectUri,
			connectOptions
		)
		console.log('\nDatabase Connected')
	}
	catch (error) {
		console.log(
			'\nDatabase connection failed',
			error.message
		)
	}

}

export default {
	connect
}