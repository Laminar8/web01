// Module Import with Import
import { Db, Collection } from 'mongodb'

// Import Interfaces
import type express from 'express'
import type { Chat } from '../../../interfaces/v1/user.interfaces'

export const post = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | undefined> => {
  try {
    const db: Db = req.app.locals.db as Db
    const collection: Collection<Chat> = db.collection('chat')
    const { userId, author, comments } = req.body as Chat
    console.log(req.body)
    const query = { userId: userId }
    const updateDocument = { $setOnInsert: { userId: userId, author: author }, $set: { comments: comments } }
    const options = { upsert: true }
    await collection.updateOne(query, updateDocument, options)
    return res.send(true)
  } catch (e) {
    next(e)
  }
}
