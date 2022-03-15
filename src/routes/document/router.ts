import { Router } from 'express'
import type { RequestHandler, Request } from 'express'
import fs from 'fs'
import config from 'config'
import letterCheckParam from '@middleware/letterCheckParam'
import letterCheckBody from '@middleware/letterCheckBody'
import fileCheck from '@middleware/fileCheck'
import folderCheck from '@middleware/folderCheck'
import authCheck from '@middleware/authCheck'

const workDir = config.get<string>('app.workDir')

const router = Router({ mergeParams: true })

router.get('/:fileName', fileCheck, (req, res) => {
	const data = JSON.parse(
		'' +
			fs.readFileSync(
				`./${workDir}/${req.params.folderName}/${req.params.fileName}.json`
			)
	)

	res.json(data)
})

router.post(
	'/:fileName',
	[
		letterCheckParam(
			'fileName',
			'Invalid file name: file name must only contain letters or digits'
		),
		folderCheck,
		authCheck,
	],
	<RequestHandler>((req, res) => {
		if (
			fs.existsSync(
				`./${workDir}/${req.params.folderName}/${req.params.fileName}.json`
			)
		) {
			return res
				.status(403)
				.send('Creation error: file with this name already exists')
		}

		fs.writeFileSync(
			`./${workDir}/${req.params.folderName}/${req.params.fileName}.json`,
			JSON.stringify(req.body)
		)
		return res.send('File has been created succesfully')
	})
)

router.patch(
	'/:fileName',
	[
		letterCheckBody(
			'fileName',
			'Invalid file name: file name must only contain letters or digits'
		),
		folderCheck,
		authCheck,
		fileCheck,
	],
	<RequestHandler>((req, res) => {
		if (!req.body.fileName || typeof req.body.fileName !== 'string') {
			return res
				.status(400)
				.send('Renaming error: new folder name must be specified')
		}

		if (fs.existsSync(`./${workDir}/${req.body.fileName}`)) {
			return res
				.status(403)
				.send('Renaming error: folder with this name already exists')
		}

		fs.renameSync(
			`./${workDir}/${req.params.folderName}/${req.params.fileName}.json`,
			`./${workDir}/${req.params.folderName}/${req.body.fileName}.json`
		)

		res.send(
			`Folder ${req.params.fileName} has been succesfully renamed to ${req.body.fileName}`
		)
	})
)

router.delete('/:fileName', [folderCheck, authCheck], <RequestHandler>((
	req,
	res
) => {
	fs.unlinkSync(
		`./${workDir}/${req.params.folderName}/${req.params.fileName}.json`
	)

	res.send(`File ${req.params.fileName} has been succesfully deleted`)
}))

export = router
