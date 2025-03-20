import { GetServerSideProps } from 'next'

import { getPeople } from '@/src/lib/data'
import PeopleWrapper from '@/src/components/people/people-cards'
import { Person } from '@/src/lib/definitions'
import Pagination from '@/src/components/people/pagination'
import { getSessionCookie, setSessionCookie } from '@/src/lib/cookies'

export default function People({ people, currentPage }: { people: Person[]; currentPage: number }) {
  const toDisplay =
    !people || !people.length ? (
      <p>No people provided on page {currentPage}</p>
    ) : (
      <PeopleWrapper people={people} />
    )

  return (
    <main>
      <Pagination currentPage={currentPage} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{toDisplay}</div>
      <Pagination currentPage={currentPage} />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, req, res }) => {
  const page = parseInt(query.page as string) || 1
  const limit = 10

  const dataKey = `people-list-page${page}-limit${limit}`
  const storedData = getSessionCookie(req, dataKey)
  if (storedData) {
    return { props: { people: storedData.results, currentPage: page } }
  }

  const peopleData = await getPeople({ page, limit })
  if (!peopleData) return { props: { people: peopleData, currentPage: page } }

  // Not saving peopleData cookie past page 4 so as to not bloat cookies
  if (page < 5) setSessionCookie(res, dataKey, peopleData)

  return { props: { people: peopleData.results, currentPage: page } }
}
