// Module Import with Import
import express from 'express'

export const get = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response | undefined => {
  try {
    return res.json({ message: 'users get' })
  } catch (e) {
    next(e)
  }
}
