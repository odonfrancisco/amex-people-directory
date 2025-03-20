import { GetServerSideProps } from 'next'
import Link from 'next/link'

import { PersonDetails } from '@/src/components/people/PersonDetails'
import { Person } from '@/src/lib/definitions'
import { getPerson } from '@/src/lib/data'
import { makeHostUrl } from '@/src/lib/getHostUrl'

export default function Page({ person }: { person: Person }) {
  if (!person)
    return (
      <p>
        Person not Found. Please go <Link href="">back</Link>
      </p>
    )

  return <PersonDetails person={person} />
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const hostUrl = makeHostUrl(req)
  const personIdMatch = req.url && req.url.match(/\/people\/([a-f0-9]{24})/)
  const personId = personIdMatch && personIdMatch[1]

  // Possible to run app without mongodb which would change the url to their name
  if (personId) {
    const dbPerson = await getPerson({ query: { _id: personId }, hostUrl })
    if (dbPerson) return { props: { person: dbPerson } }
  }

  const personData = query.person as string

  if (!personData) return { props: { person: null } }

  const person: Person = JSON.parse(personData)

  return { props: { person } }
}
