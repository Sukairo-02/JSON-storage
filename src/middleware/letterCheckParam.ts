import type { RequestHandler } from 'express'

const testRegExp = new RegExp(/^[A-Za-z0-9]*$/)

export = (param: string, errMsg: string) => {
	return <RequestHandler>((req, res, next) => {
		if (!req.params[param] || !testRegExp.test(req.params[param])) {
			return res.status(400).send(errMsg)
		}

		next()
	})
}
