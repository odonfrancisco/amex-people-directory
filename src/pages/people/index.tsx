import { GetServerSideProps } from 'next'
import { getPeople } from '@/src/lib/data'
import PeopleWrapper from '@/src/components/people/people-cards'
import { PeopleResults } from '@/src/lib/definitions'
import { usePeople } from '@/src/context/PeopleContext'

export default function People(personData: PeopleResults) {
  // const { results, info } = personData
  // const { results } = await getPeople()
  const { setSelectedPerson } = usePeople()

  return (
    <main>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <PeopleWrapper people={personData.results} setSelectedPerson={setSelectedPerson} />
      </div>
    </main>
  )
}

// export async function getStaticProps() {
//   const res = await getPeople()

//   return { props: res }
// }

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = parseInt(query.page as string) || 1
  const res = await getPeople(page)

  return { props: res }
}
