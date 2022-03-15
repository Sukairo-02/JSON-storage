import { Router } from 'express'
import fs from 'fs'
import authCheck from '@middleware/authCheck'

const router = Router()

router.post('/:fileName', authCheck, (req, res) => {})
router.get('/:fileName', (req, res) => {})
router.patch('/:fileName', authCheck, (req, res) => {})
router.delete('/:fileName', authCheck, (req, res) => {})

export = router
