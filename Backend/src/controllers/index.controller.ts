// Module Import with Import
import type express from 'express'
import type { Collection } from 'mongodb'
import type { Users } from '../interfaces/v1/user.interfaces'

export const index = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | undefined> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const collection: Collection<Users> = req.app.locals.collection
    const query = { name: 'Red' }
    const options = {
      // sort matched documents in descending order by rating
      sort: { _id: -1 },
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 1, name: 1, town: 1 },
    }
    const result = await collection.findOne(query, options)
    console.log(result)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return res.json(result)
  } catch (e) {
    next(e)
  }
}
