// Module Import with Import
import express from 'express'

// Module Initialize
export const router = express.Router()

router.get('/', function (req: express.Request, res: express.Response, next: express.NextFunction) {
  res.json({ message: 'Hello Aha!' })
})
