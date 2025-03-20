import got from 'got'

import { PeopleResults, Person } from '@/src/lib/definitions'

const BASE_URL = 'https://randomuser.me/api/'
const QUERY_PARAMS = 'inc=picture,name,dob,location,email,phone'

export async function getPeople({
  page = 1,
  limit = 10,
  hostUrl,
}: {
  page?: number
  limit?: number
  hostUrl: string
}): Promise<Person[] | null> {
  try {
    // Fetch from DB first
    const dbDocs: { data: Person[] } = await got(`${hostUrl}/api/people`, {
      searchParams: { page, limit },
    }).json()
    if (dbDocs.data && dbDocs.data.length) return dbDocs.data

    // If current page doesn't exist in DB then fetch API & then save to DB
    const res: PeopleResults = await got(
      `${BASE_URL}?page=${page}&results=${limit}&${QUERY_PARAMS}`,
    ).json()

    const modifiedResults: Person[] = res.results.map(({ name, ...rest }) => ({
      ...rest,
      page,
      name: { ...name, full: Object.values(name).join(' ') },
    }))

    const docs: { data: Person[] } = await got
      .post(`${hostUrl}/api/people`, { json: modifiedResults })
      .json()

    return docs.data && docs.data.length ? docs.data : modifiedResults
  } catch (error) {
    console.error(`Error fetching people`, error)

    return null
  }
}

export async function getPerson({ query, hostUrl }: { query: object; hostUrl: string }) {
  try {
    const doc: { data: Person[] } = await got(`${hostUrl}/api/people`, {
      // Lint workaround 😬
      searchParams: { ...query },
    }).json()

    return doc.data[0]
  } catch (err) {
    console.error('Error fetching individual', err)
    return null
  }
}
