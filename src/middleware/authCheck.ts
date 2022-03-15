import type { RequestHandler } from 'express'
import fs from 'fs'
import config from 'config'
import bcrypt from 'bcrypt'

const workDir = config.get<string>('app.workDir')
const passFile = config.get<string>('app.passFile')

export = <RequestHandler>((req, res, next) => {
	if (!req.body.password || typeof req.body.password !== 'string') {
		return res.status(400).send('Password must be string')
	}

	const pass =
		'' +
		fs.readFileSync(`./${workDir}/${req.params.folderName}/${passFile}`)

	if (!bcrypt.compareSync(req.body.password, pass)) {
		return res.status(403).send('Invalid password')
	}

	next()
})
