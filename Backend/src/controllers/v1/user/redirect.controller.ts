import type express from 'express'

export const redirect = (req: express.Request, res: express.Response): void => {
  const thisDay = req.query.thisDay as string
  return res.redirect(`http://localhost:5000/#/chat/${thisDay}`)
}
