import express from 'express'
import { input, get } from '../../controllers/v1/user.controller'

export const router = express.Router()

router.route('/users').put(input)
router.route('/users').get(get)
