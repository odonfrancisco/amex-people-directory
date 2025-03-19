import Image from 'next/image'
import Link from 'next/link'

import { Person } from '@/src/lib/definitions'

export default function PeopleWrapper({
  people,
  setSelectedPerson,
}: {
  people: Person[]
  setSelectedPerson: (person: Person) => void
}) {
  return (
    <>
      {/* I believe I don't need to set the param type as Person here since it's already set on line 5 */}
      {!people ? (
        <p>No people returned </p>
      ) : (
        people.map(person => (
          <PersonCard
            person={person}
            // I want to use person.ID for key but not all people return a valid ID prop.
            key={`${person.name}-${person.location.city}`}
            setSelectedPerson={setSelectedPerson}
          />
        ))
      )}
    </>
  )
}

// Hmm, I'm passing down the setSelectedPerson 3 components deep... there's gotta be a cleaner way
// The reason I'm not importing it directly into this file is because I assume that contexts can only be imported within app folder files or pages folder files... i'll have to test this and see
export function PersonCard({
  person,
  setSelectedPerson,
}: {
  person: Person
  setSelectedPerson: (person: Person) => void
}) {
  const { name, picture, dob, location } = person

  return (
    <Link
      href={`/people/${name.full.replaceAll(' ', '-')}`}
      onClick={() => setSelectedPerson(person)}
    >
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm min-h-full">
        <div className="flex p-4 justify-center">
          <Image
            src={picture.thumbnail}
            alt={`Picture of ${name}`}
            width="48"
            height="48"
            className="block md:hidden rounded-full"
          />
          <Image
            src={picture.medium}
            alt={`Picture of ${name}`}
            width="78"
            height="78"
            className="hidden md:block lg:hidden rounded-full"
          />
          <Image
            src={picture.large}
            alt={`Picture of ${name}`}
            width="128"
            height="128"
            className="hidden lg:block rounded-full"
          />
        </div>
        <h3 className="ml-2 text-xl font-medium">{name.full}</h3>
        <h3 className="pt-3">
          {dob.age} Year{dob.age !== 1 && 's'} Old
        </h3>
        <h3 className="pt-1">From {location.city}</h3>
      </div>
    </Link>
  )
}
