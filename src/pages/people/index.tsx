import { GetServerSideProps } from 'next'

import { getPeople } from '@/src/lib/data'
import PeopleWrapper from '@/src/components/people/people-cards'
import { Person } from '@/src/lib/definitions'
import { usePeople } from '@/src/context/PeopleContext'
import Pagination from '@/src/components/people/pagination'

export default function People({ people, currentPage }: { people: Person[]; currentPage: number }) {
  const { setSelectedPerson } = usePeople()

  return (
    <main>
      <Pagination currentPage={currentPage} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <PeopleWrapper people={people} setSelectedPerson={setSelectedPerson} />
      </div>
      <Pagination currentPage={currentPage} />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = parseInt(query.page as string) || 1
  const res = await getPeople(page)

  return { props: { people: res.results, currentPage: page } }
}
