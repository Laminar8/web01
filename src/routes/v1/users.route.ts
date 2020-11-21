import express from 'express'
import { get } from '../../controllers/v1/user.controller'

export const router = express.Router()

router.route('/users').get(get)
