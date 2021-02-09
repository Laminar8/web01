// Module Import with Import
import { Db, Collection } from 'mongodb'

// Import Interfaces
import type express from 'express'
import type { Users } from '../../interfaces/v1/user.interfaces'

export const input = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | undefined> => {
  try {
    const db: Db = req.app.locals.db as Db
    const collection: Collection<Users> = db.collection('user')
    const doc = { username: 'Red', password: 'kanto' }
    const result = await collection.insertOne(doc)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return res.send(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`)
  } catch (e) {
    next(e)
  }
}

export const get = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response<string> | undefined> => {
  try {
    const db: Db = req.app.locals.db as Db
    const collection: Collection<Users> = db.collection('user')
    const estimate: number = await collection.estimatedDocumentCount()
    return res.send(`Estimated number of documents in the movies collection : ${estimate}`)
  } catch (e) {
    next(e)
  }
}
