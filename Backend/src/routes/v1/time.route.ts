import express from 'express'
import { get } from '../../controllers/v1/time/time.controller'

export const router = express.Router()

router.route('/time').get(get)
