// Module Import with Import
import type express from 'express'
import { Weather } from './weather/weather'

export const get = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response<string> | undefined> => {
  try {
    const weather = await Weather()

    // console.log(weather)
    return res.send(weather)
  } catch (e) {
    next(e)
  }
}
