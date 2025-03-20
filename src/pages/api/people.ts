import { NextApiRequest, NextApiResponse } from 'next'

import { connectToDatabase } from '@/src/lib/mongodb'
import { Person } from '@/src/models/Person'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cnx = await connectToDatabase()
  if (!cnx)
    return res.status(200).json({ message: 'No database connection found. Using random API' })

  if (req.method === 'GET') {
    if (!Object.keys(req.query).length)
      return res.status(400).json({ message: 'Query params required' })

    const { limit, ...query } = req.query
    const people = await Person.find(query)
      // 100 JIC since there's no actual pagination built into the queries
      .limit(parseInt(limit as string) || 100)
      .lean()
    return res.status(200).json({ data: people })
  }

  if (req.method === 'POST') {
    try {
      const docs = await Person.insertMany(req.body)
      return res.status(200).json({ data: docs })
    } catch (err) {
      console.error('Error adding people docs to db', err)
      return res.status(500).json({ message: 'Error adding docs to DB' })
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' })
}
