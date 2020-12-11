// Module Import
import express from 'express'

// Router Import
import { router as usersRouter } from './users.route'

// Variable Initialize
const router = express.Router()
router.use(usersRouter)

export default router
