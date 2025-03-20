import { GetServerSideProps } from 'next'
import Link from 'next/link'

import { PersonDetails } from '@/src/components/people/person'
import { Person } from '@/src/lib/definitions'

export default async function Page({ person }: { person: Person }) {
  if (!person)
    return (
      <p>
        Person not Found. Please go <Link href="">back</Link>
      </p>
    )

  return <PersonDetails person={person} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const personData = query.person as string

  if (!personData) return { props: { person: null } }

  const person: Person = JSON.parse(personData)

  return { props: { person } }
}
