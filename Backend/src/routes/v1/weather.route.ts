import express from 'express'
import { get } from '../../controllers/v1/weather.controller'

export const router = express.Router()

router.route('/weather').get(get)
