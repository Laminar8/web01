import express from 'express'
import { get } from '../../controllers/v1/user/user.controller'
import { getChat, post } from '../../controllers/v1/user/chat.controller'
import { redirect } from '../../controllers/v1/user/redirect.controller'

export const router = express.Router()

router.route('/users').get(get)

// Redirect
router.route('/chat/change').get(redirect)

// Fronted chat -> Backend DB upload
router.route('/chat').post(post)
router.route('/chat').get(getChat)
