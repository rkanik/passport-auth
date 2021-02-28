export const _isProd = process.env.NODE_ENV === 'production'
export const _isDev = process.env.NODE_ENV === 'development'

export const _serverBase = _isDev
	? 'http://localhost:3500'
	: 'https://rk-passport-auth.herokuapp.com'
