import Link from 'next/link'

import { PersonDetails } from '@/src/components/people/person'
import { usePeople } from '@/src/context/PeopleContext'

export default function Page() {
  const { selectedPerson } = usePeople()

  if (!selectedPerson)
    return (
      <p>
        Person not Found. Please go <Link href="">back</Link>
      </p>
    )

  return <PersonDetails person={selectedPerson} />
}
