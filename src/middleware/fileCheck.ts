import type { RequestHandler } from 'express'
import fs from 'fs'
import config from 'config'

const workDir = config.get<string>('app.workDir')

export = <RequestHandler>((req, res, next) => {
	if (!req.params.fileName) {
		return res.status(400).send('File name must be specified')
	}

	if (
		!fs.existsSync(
			`./${workDir}/${req.params.folderName}/${req.params.fileName}.json`
		)
	) {
		return res.status(404).send(`Nonexistent file: ${req.params.fileName}`)
	}

	next()
})
