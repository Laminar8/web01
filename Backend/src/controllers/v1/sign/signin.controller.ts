// Import Module
import passport from 'passport'

// Import Interfaces
import type express from 'express'

export const post = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  passport.authenticate('local', { successRedirect: 'http://localhost:5000', failureRedirect: 'http://localhost:5000/#/signin' })(req, res, next)
}
