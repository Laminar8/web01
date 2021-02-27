import express from 'express'
import { post } from '../../controllers/v1/sign/signin.controller'
import { get } from '../../controllers/v1/sign/signout.controller'
import { input } from '../../controllers/v1/sign/signup.controller'

export const router = express.Router()

// Sign in
router.route('/signin').post(post)

// Sign out
router.route('/signout').get(get)

// Sign up
router.route('/signup').post(input)
