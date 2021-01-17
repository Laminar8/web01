import express from 'express'
import { get } from '../../controllers/v1/week.controller'

export const router = express.Router()

router.route('/week/:weekNumber').get(get)
