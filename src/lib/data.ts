import got from 'got'

import { PeopleResults, Person } from '@/src/lib/definitions'

const BASE_URL = 'https://randomuser.me/api/'
const QUERY_PARAMS = 'inc=picture,name,dob,location,email,phone'

export async function getPeople({
  page = 1,
  limit = 10,
}: {
  page?: number
  limit?: number
}): Promise<PeopleResults | null> {
  try {
    const res: PeopleResults = await got(
      `${BASE_URL}?page=${page}&results=${limit}&${QUERY_PARAMS}`,
    ).json()

    const modifiedResults: Person[] = res.results.map(({ name, ...rest }) => ({
      ...rest,
      name: { ...name, full: Object.values(name).join(' ') },
    }))

    return { ...res, results: modifiedResults }
  } catch (error) {
    console.error(`Error fetching people: ${error}`)

    return null
  }
}
