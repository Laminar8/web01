// Module Import
import express from 'express'

// Router Import
import { router as weatherRouter } from './weather.route'
import { router as weekRouter } from './week.route'

// Variable Initialize
const router = express.Router()
router.use(weatherRouter)
router.use(weekRouter)

export default router
