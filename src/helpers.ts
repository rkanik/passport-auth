import bcrypt from 'bcrypt'
import status from 'http-status-codes'

import { ExecuteFunction } from './types'
import { NextFunction, Request, Response } from 'express'

export const comparePassword = (encrypted: string, data: string) => {
	console.log('comparePassword', encrypted, data)
	return new Promise(resolve => {
		bcrypt.compare(data, encrypted, (_, same: boolean) => {
			return resolve(same)
		});
	})
}

export class HTTPError extends Error {
	statusCode: number
	statusText: string
	message: string
	constructor(statusCode?: number, message?: string) {
		super();
		this.statusCode = statusCode || 500;
		this.message = message || 'Something went wrong';
		this.statusText = status.getStatusText(this.statusCode)
	}
}

export const error =
	(code: number, message?: string) => {
		return {
			error: true,
			statusCode: code,
			message
		}
	}

export const success =
	(data: any, message?: string) => {
		return {
			error: false,
			data, message
		}
	}

export const handleRequest = (execute: ExecuteFunction) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			// Executing the request
			const {
				error, data, message,
				statusCode = status.OK,
			} = await execute(req)

			// Throwing error 
			if (error) throw new HTTPError(
				statusCode,
				message
			)

			// Sending success response
			return res
				.status(statusCode)
				.json(data)
		}
		catch (err) { return next(err) }
	}
