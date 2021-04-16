// Module Import with Import
import { Db, Collection } from 'mongodb'

// Import Interfaces
import type express from 'express'
import type { Chat, People } from '../../../interfaces/v1/user.interfaces'

export const getChat = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | undefined> => {
  try {
    const db: Db = req.app.locals.db as Db
    const collection: Collection<Chat> = db.collection('chat')
    const userId = req.query.userId as string
    const author = req.query.author as string
    const date = req.query.date as string
    const query = { userId, author, date }
    const chat = await collection.findOne(query)
    console.log(chat)
    if (chat === null) {
      return res.send({ comments: [], tags: [], people: [] })
    } else {
      return res.send({ comments: chat?.comments, tags: chat?.tags, people: chat?.people })
    }
  } catch (e) {
    next(e)
  }
}

export const post = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | undefined> => {
  try {
    const db: Db = req.app.locals.db as Db
    const collection: Collection<Chat> = db.collection('chat')
    const { userId, author, comments, date, tags, people } = req.body as Chat
    const query = { userId, author, date }
    const updateDocument = { $setOnInsert: { userId, author, date }, $set: { comments, tags, people } }
    const options = { upsert: true }
    await collection.updateOne(query, updateDocument, options)
    return res.send(true)
  } catch (e) {
    next(e)
  }
}

export const getPeople = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | undefined> => {
  try {
    const db: Db = req.app.locals.db as Db
    const collection: Collection<People> = db.collection('people')
    const userId = req.query.userId as string
    const query = { userId }
    const people = await collection.findOne(query)
    console.log(people)
    if (people === null) {
      return res.send({ people: [] })
    } else {
      return res.send({ people: people?.people })
    }
  } catch (e) {
    next(e)
  }
}

export const postPeople = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response | undefined> => {
  try {
    const db: Db = req.app.locals.db as Db
    const collection: Collection<People> = db.collection('people')
    const { userId, people } = req.body as People
    const query = { userId }
    const updateDocument = { $setOnInsert: { userId }, $set: { people } }
    const options = { upsert: true }
    console.log(people)
    await collection.updateOne(query, updateDocument, options)
    return res.send(true)
  } catch (e) {
    next(e)
  }
}
