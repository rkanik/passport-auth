import { Request } from 'express'

export type ExecuteFunction =
	(req: Request) => Promise<{
		error?: boolean
		statusCode?: number
		data?: any
		message?: string
	}>
