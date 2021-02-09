// Module Import
import express from 'express'

// Router Import
import { router as weatherRouter } from './weather.route'
import { router as weekRouter } from './week.route'
import { router as userRouter } from './user.route'
import { router as signinRouter } from './sign.route'

// Variable Initialize
const router = express.Router()

router.use(weatherRouter)
router.use(weekRouter)
router.use(userRouter)
router.use(signinRouter)

export default router
