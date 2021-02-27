// Import Interfaces
import type express from 'express'

export const get = (req: express.Request, res: express.Response): void => {
  req.session.destroy(() => {
    req.logout()
    res.redirect('http://localhost:5000/#/chat')
  })
}
