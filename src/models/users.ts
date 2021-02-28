import mongoose from 'mongoose'
import userSchema from './schema/user'

const Users = mongoose.model('passport-auth-users', userSchema)

export default Users