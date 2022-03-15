import type { RequestHandler } from 'express'

const testRegExp = new RegExp(/^[A-Za-z0-9]*$/)

export = (source: 'params' | 'body', param: string, errMsg: string) => {
	return <RequestHandler>((req, res, next) => {
		if (!req[source][param] || !testRegExp.test(req[source][param])) {
			return res.status(400).send(errMsg)
		}

		next()
	})
}
