// Module Import with Import
import type express from 'express'

export const index = (req: express.Request, res: express.Response, next: express.NextFunction): express.Response => res.json({ message: 'Hello Aha!' })
