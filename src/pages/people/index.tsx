import { GetServerSideProps } from 'next'

import { getPeople } from '@/src/lib/data'
import PeopleWrapper from '@/src/components/people/PeopleWrapper'
import { Person } from '@/src/lib/definitions'
import Pagination from '@/src/components/people/Pagination'
import { makeHostUrl } from '@/src/lib/getHostUrl'

export default function People({ people, currentPage }: { people: Person[]; currentPage: number }) {
  const toDisplay =
    !people || !people.length ? (
      <p>No people provided on page {currentPage}</p>
    ) : (
      <PeopleWrapper people={people} page={currentPage} />
    )

  return (
    <main>
      <div className="sticky top-0">
        <Pagination currentPage={currentPage} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{toDisplay}</div>
      <Pagination currentPage={currentPage} />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const page = parseInt(query.page as string) || 1
  const limit = 10
  const hostUrl = makeHostUrl(req)

  const peopleData = await getPeople({
    page,
    limit,
    hostUrl,
  })
  if (!peopleData) return { props: { people: peopleData, currentPage: page } }

  return { props: { people: peopleData, currentPage: page } }
}
