// Import Module
import dotenv from 'dotenv'
import Mongodb from 'mongodb'

// Module Initialize
dotenv.config()

// DB configs
if (!process.env.DB_PASSWORD) {
  console.log(`Error to get password`)
  process.exit(1)
}

// conntection interface
interface ConnectionInfo {
  db_user: string
  db_password: string
  db_name: string
}

export const connectionInfo: ConnectionInfo = {
  db_user: process.env.DB_USER || 'user',
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_Name || 'users',
}

const uri = `mongodb+srv://${connectionInfo.db_user}:${connectionInfo.db_password}@cluster0.rubs0.mongodb.net?retryWrites=true&w=majority`

// Client Connection
export const client = new Mongodb.MongoClient(uri, { useNewUrlParser: true })
console.log()
console.log(`DB connection is succesful ♥`)
console.log()
