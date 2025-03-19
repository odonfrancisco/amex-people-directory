// @ts-expect-error pako
import pako from 'pako'

import { PeopleResults } from '@/src/lib/definitions'

export function compressData(data: object): string {
  const jsonstring = JSON.stringify(data)
  const compressed = pako.deflate(jsonstring, { to: 'string' })
  return Buffer.from(compressed, 'binary').toString('base64')
}

export function decompressData(compressedString: string): PeopleResults | null {
  try {
    const binaryData = Buffer.from(compressedString, 'base64')
    const decompressed = pako.inflate(binaryData, { to: 'string' })
    return JSON.parse(decompressed)
  } catch (error) {
    console.error('Decompression failed:', error)
    return null
  }
}
