import type { RequestHandler } from 'express'

const testRegExp = new RegExp(/^[A-Za-z0-9]*$/)

export = (param: string, errMsg: string) => {
	return <RequestHandler>((req, res, next) => {
		if (!req.body[param] || !testRegExp.test(req.body[param])) {
			return res.status(400).send(errMsg)
		}

		next()
	})
}
