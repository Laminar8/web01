// Module Import with Import
import { Db, Collection } from 'mongodb'

// Import Interfaces
import type express from 'express'
import type { Chat } from '../../../interfaces/v1/user.interfaces'

export const getChat = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | undefined> => {
  try {
    const db: Db = req.app.locals.db as Db
    const collection: Collection<Chat> = db.collection('chat')
    const userId = req.query.userId as string
    const author = req.query.author as string
    const date = req.query.date as string
    const query = { userId: userId, author: author, date: date }
    const chat = await collection.findOne(query)
    console.log(chat?.comments)
    return res.send(chat?.comments)
  } catch (e) {
    next(e)
  }
}

export const post = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | undefined> => {
  try {
    const db: Db = req.app.locals.db as Db
    const collection: Collection<Chat> = db.collection('chat')
    const { userId, author, comments, date } = req.body as Chat
    const query = { userId: userId, author: author, date: date }
    const updateDocument = { $setOnInsert: { userId: userId, author: author, date: date }, $set: { comments: comments } }
    const options = { upsert: true }
    await collection.updateOne(query, updateDocument, options)
    return res.send(true)
  } catch (e) {
    next(e)
  }
}
