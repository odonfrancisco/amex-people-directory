/* eslint-disable  @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string
const cnx = (global as any).mongoose || { conn: null, promise: null }

export async function connectToDatabase() {
  // This app doesn't need mongodb to function properly, but in order to work offline it does require MONGODB
  if (!MONGODB_URI) return null

  if (cnx.conn) return cnx.conn

  if (!cnx.promise) {
    cnx.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'people-directory',
    } as mongoose.ConnectOptions)
  }

  cnx.conn = await cnx.promise
  return cnx.conn
}
