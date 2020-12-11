// Module Import with Import
import type express from 'express'
import type { Collection } from 'mongodb'

// Import Interfaces
import type { Users } from '../../interfaces/v1/user.interfaces'

export const input = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | undefined> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const collection: Collection<Users> = req.app.locals.collection
    const doc = { name: 'Red', town: 'kanto' }
    const result = await collection.insertOne(doc)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return res.send(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`)
  } catch (e) {
    next(e)
  }
}

export const get = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response<string> | undefined> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const collection: Collection<Users> = req.app.locals.collection
    const estimate: number = await collection.estimatedDocumentCount()
    return res.send(`Estimated number of documents in the movies collection : ${estimate}`)
  } catch (e) {
    next(e)
  }
}
