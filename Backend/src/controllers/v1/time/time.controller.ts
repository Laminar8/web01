import moment from 'moment'

// Import Interfaces
import type express from 'express'

export const get = (req: express.Request, res: express.Response): express.Response => {
  const today = moment().format('YYYYMMDD')
  return res.send({ today: today })
}
