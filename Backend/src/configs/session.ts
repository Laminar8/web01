import session from 'express-session'
import dotenv from 'dotenv'
import type { Express } from 'express'

// Module Initialize
dotenv.config()

export const configureSession = (app: Express): void => {
  // Check dotenv Config
  if (!process.env['SESSION_SECRET']) {
    process.exit(1)
  }
  app.use(
    session({
      secret: process.env['SESSION_SECRET'],
      cookie: { maxAge: 60 * 60 * 1000 },
      resave: false,
      saveUninitialized: true,
    })
  )
}
