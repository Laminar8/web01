// Module Import with Import
import { Db, Collection } from 'mongodb'

// Import Interfaces
import type express from 'express'
import type { Users } from '../../../interfaces/v1/user.interfaces'

export const input = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
  try {
    const db: Db = req.app.locals.db as Db
    const collection: Collection<Users> = db.collection('user')
    const { username, email, password } = req.body as Users
    await collection.insertOne({ username, email, password })
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return res.redirect('http://localhost:5000/#/signin')
  } catch (e) {
    next(e)
  }
}
