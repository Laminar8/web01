// Module Import with Import
import type express from 'express'
import { Week } from './week/week'

export const get = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response<string> | undefined => {
  try {
    const week = Week(req.params.weekNumber)
    return res.send(week)
  } catch (e) {
    next(e)
  }
}
