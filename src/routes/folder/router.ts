import { Router } from 'express'
import type { RequestHandler } from 'express'
import fs from 'fs'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import config from 'config'
import folderCheck from '@middleware/folderCheck'
import authCheck from '@middleware/authCheck'
import document from '@routes/document/router'

const workDir = config.get<string>('app.workDir')
const passFile = config.get<string>('app.passFile')

const router = Router()

router.post('/:folderName', async (req, res) => {
	if (fs.existsSync(`./${workDir}/${req.params.folderName}`)) {
		return res
			.status(403)
			.send('Creation error: folder with this name already exists')
	}

	const pass = uuid()
	const passHash = bcrypt.hashSync(pass, 7)

	fs.mkdirSync(`./${workDir}/${req.params.folderName}`)
	fs.writeFileSync(
		`./${workDir}/${req.params.folderName}/${passFile}`,
		passHash
	)

	res.json({
		message:
			'Folder has been succesfully created. Save your folder password to be able to operate it later...',
		password: pass,
	})
})

router.get('/:folderName', folderCheck, (req, res) => {
	const desiredFiles = new RegExp(/.*\.json$/)
	const routes = fs
		.readdirSync(`./${workDir}/${req.params.folderName}/`)
		.filter((e) => desiredFiles.test(e))
		.map((e) => e.substr(0, e.length - 5))

	res.json({ routes })
})

router.patch('/:folderName', [folderCheck, authCheck], <RequestHandler>((
	req,
	res
) => {
	if (!req.body.folderName || typeof req.body.folderName !== 'string') {
		return res
			.status(400)
			.send('Renaming error: new folder name must be specified')
	}

	if (fs.existsSync(`./${workDir}/${req.body.folderName}`)) {
		return res
			.status(403)
			.send('Renaming error: folder with this name already exists')
	}

	fs.renameSync(
		`./${workDir}/${req.params.folderName}/`,
		`./${workDir}/${req.body.folderName}/`
	)

	res.send(
		`Folder ${req.params.folderName} has been succesfully renamed to ${req.body.folderName}`
	)
}))

router.delete('/:folderName', [folderCheck, authCheck], <RequestHandler>((
	req,
	res
) => {
	fs.rmdirSync(`./${workDir}/${req.params.folderName}/`, { recursive: true })

	res.send(
		`Folder ${req.params.folderName} and it's documents have been succesfully deleted`
	)
}))

router.use('/:folderName/', document)

export = router
