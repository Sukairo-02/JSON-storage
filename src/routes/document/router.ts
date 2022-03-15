import { Router } from 'express'
import type { RequestHandler } from 'express'
import fs from 'fs'
import authCheck from '@middleware/authCheck'
import folderCheck from '@middleware/folderCheck'

const router = Router()

router.post('/:fileName', [folderCheck, authCheck], <RequestHandler>(
	((req, res) => {})
))
router.get('/:fileName', (req, res) => {})
router.patch('/:fileName', [folderCheck, authCheck], <RequestHandler>(
	((req, res) => {})
))
router.delete('/:fileName', [folderCheck, authCheck], <RequestHandler>(
	((req, res) => {})
))

export = router
