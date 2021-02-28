import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

export type UserDocument = mongoose.Document & {
	username: string
	password?: string
	provider: string
	createdAt: string
	updatedAt: string
	name?: string
	email?: string
	emailVerified: boolean
	externalId: string
	thumbnail?: string
}
const userSchema = new mongoose.Schema<UserDocument>({
	name: String,
	externalId: String,
	thumbnail: String,
	password: String,
	email: {
		type: String,
		unique: true,
	},
	emailVerified: {
		type: Boolean,
		default: false
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	provider: {
		type: String,
		default: 'local'
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false
	},
	updatedAt: {
		type: Date,
		default: Date.now()
	}
})

/**
 * Password hash middleware.
 */
userSchema.pre("save", function (next) {
	const user = this as UserDocument;
	if (!user.password) return next()
	if (!user.isModified("password")) { return next(); }
	bcrypt.genSalt(10, (err, salt) => {
		if (err) { return next(err); }
		bcrypt.hash(user.password, salt, (err: Error, hash: string) => {
			if (err) { return next(err); }
			user.password = hash;
			next();
		});
	});
});

export default userSchema