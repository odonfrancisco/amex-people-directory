import got from 'got'

import { PeopleResults, Person } from '@/app/lib/definitions'

const BASE_URL = 'https://randomuser.me/api/'
const QUERY_PARAMS = {
  people: 'inc=picture,name,dob,location',
  person: 'inc=picture,name,dob,location,email,phone',
}

export async function getPeople(pageNumber: number = 1, limit: number = 10) {
  try {
    const res: PeopleResults = await got(
      `${BASE_URL}?page=${pageNumber}&results=${limit}&${QUERY_PARAMS.people}`,
    ).json()

    const simpleResults: Person[] = res.results.map(({ location, name, picture, dob }) => ({
      name: Object.values(name).join(' '),
      city: location.city,
      picture,
      age: dob.age,
    }))

    return { ...res, results: simpleResults }
  } catch (error) {
    console.error(`Error fetching people: ${error}`)
    throw Error('Error fetching people')
  }
}
