import { serialize, parse } from 'cookie'
import { IncomingMessage, ServerResponse } from 'http'

import { compressData, decompressData } from '@/src/lib/compression'
import { PeopleResults } from '@/src/lib/definitions'

export function setSessionCookie(
  res: ServerResponse,
  key: string,
  value: object,
  maxAge = 7 * 24 * 60 * 60,
) {
  const compressedData = compressData(value)
  const status = res.setHeader(
    'Set-Cookie',
    serialize(key, compressedData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge,
      path: '/',
    }),
  )
  console.log(status)
}

export function getSessionCookie(req: IncomingMessage, key: string): PeopleResults | null {
  const cookies = parse(req.headers.cookie || '')

  return cookies[key] ? decompressData(cookies[key]) : null
}
