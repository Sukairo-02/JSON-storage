import 'module-alias/register'
import express from 'express'
import type { ErrorRequestHandler } from 'express'
import fs from 'fs'
import config from 'config'
import folder from '@routes/folder/router'

const app = express()
const PORT = config.get('server.PORT') || 3000
const workDir = config.get('app.workDir')

app.use(express.json())
app.use('/', folder)
app.use(<ErrorRequestHandler>((err, req, res, next) => {
	console.error(err.stack)
	console.log(`Request:\n${req}\n`)
	return res.status(500).send('Something went wrong...\nTry again later.')
}))

const start = () => {
	try {
		if (!fs.existsSync(`./${workDir}`)) {
			fs.mkdirSync(`./${workDir}`)
		}
		app.listen(PORT, () => {
			console.log(`Server has been started at port ${PORT}.\n`)
		})
	} catch (e) {
		console.error(e)
	}
}

start()
