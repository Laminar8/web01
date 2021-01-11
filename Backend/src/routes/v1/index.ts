// Module Import
import express from 'express'

// Router Import
import { router as weatherRouter } from './weather.route'

// Variable Initialize
const router = express.Router()
router.use(weatherRouter)

export default router
