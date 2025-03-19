import { PersonDetails } from '@/src/components/people/person'
import { usePeople } from '@/src/context/PeopleContext'

export default function Page() {
  const { selectedPerson: person } = usePeople()

  return <PersonDetails person={person} />
}
