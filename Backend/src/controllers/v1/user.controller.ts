// Import Interfaces
import type express from 'express'

declare module 'express-session' {
  export interface SessionData {
    passport: {
      user: { _id: string; username: string; password: string }
    }
  }
}
export const get = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response<string> | undefined => {
  try {
    const user = req.session.passport
    if (user == undefined) {
      console.log('hi)')
    }
    console.log(user)
    return res.send(`${user}`)
  } catch (e) {
    next(e)
  }
}
