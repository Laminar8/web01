import express from 'express'
import { get } from '../../controllers/v1/user/user.controller'
import { post } from '../../controllers/v1/user/chat.controller'

export const router = express.Router()

router.route('/users').get(get)
router.route('/chat').post(post)
