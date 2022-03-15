import type { RequestHandler } from 'express'
import fs from 'fs'
import config from 'config'

const workDir = config.get<string>('app.workDir')

export = <RequestHandler>((req, res, next) => {
	if (!req.params.folderName) {
		return res.status(400)
	}

	if (!fs.existsSync(`./${workDir}/${req.params.folderName}`)) {
		return res
			.status(404)
			.send(`Nonexistent folder: ${req.params.folderName}`)
	}

	next()
})
