import express from 'express'
import { get } from '../../controllers/v1/user/user.controller'
import { getChat, getPeople, getHistory, post, postPeople } from '../../controllers/v1/user/chat.controller'
import { redirect } from '../../controllers/v1/user/redirect.controller'

export const router = express.Router()

router.route('/users').get(get)

// Redirect
router.route('/chat/change').get(redirect)

// Write DB
router.route('/chat').post(post)
router.route('/chat/people').post(postPeople)

// Read DB
router.route('/chat').get(getChat)
router.route('/chat/people').get(getPeople)
router.route('/chat/history').get(getHistory)
