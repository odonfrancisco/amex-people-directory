import { IncomingMessage } from 'http'

export function makeHostUrl(req: IncomingMessage) {
  return `${
    process.env.NODE_ENV === 'production' ? `https://${req.headers.host}` : 'http://127.0.0.1:3000'
  }`
}
