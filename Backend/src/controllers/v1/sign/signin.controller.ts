// Import Module
import passport from 'passport'
import axios from 'axios'

// Import Interfaces
import type express from 'express'

interface ServerData {
  today: string
}

export const post = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  void axios.request({ method: 'GET', url: 'http://localhost:4000/v1/time' }).then((response) => {
    const data = response.data as ServerData
    const today = data.today
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    passport.authenticate('local', { successRedirect: `http://localhost:5000/#/chat/${today}`, failureRedirect: 'http://localhost:5000/#/signin' })(
      req,
      res,
      next
    )
  })
}
