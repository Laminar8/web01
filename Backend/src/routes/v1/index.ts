// Module Import
import express from 'express'

// Router Import
import { router as weekRouter } from './week.route'
import { router as userRouter } from './user.route'
import { router as signinRouter } from './sign.route'
import { router as timeinRouter } from './time.route'

// Variable Initialize
const router = express.Router()

router.use(weekRouter)
router.use(userRouter)
router.use(signinRouter)
router.use(timeinRouter)

export default router
