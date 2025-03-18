import Image from 'next/image'
import Link from 'next/link'

import { Person } from '@/app/lib/definitions'

export default async function PeopleWrapper({ people }: { people: Person[] }) {
  return (
    <>
      {/* I believe I don't need to set the param type as Person here since it's already set on line 5 */}
      {people.map(person => (
        <PersonCard
          person={person}
          // I want to use person.ID for key but not all people return a valid ID prop.
          key={`${person.name}-${person.location.city}`}
        />
      ))}
    </>
  )
}

export function PersonCard({ person }: { person: Person }) {
  const { name, picture, dob, location } = person

  return (
    <Link
      href={{
        pathname: `/people/${name.full.replaceAll(' ', '-')}`,
        query: JSON.stringify(person),
        // query: { data: person },
      }}
    >
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          <Image
            src={picture.thumbnail}
            alt={`Picture of ${name}`}
            width="48"
            height="48"
            className="block md:hidden"
          />
          <Image
            src={picture.medium}
            alt={`Picture of ${name}`}
            width="78"
            height="78"
            className="hidden md:block lg:hidden"
          />
          <Image
            src={picture.large}
            alt={`Picture of ${name}`}
            width="128"
            height="128"
            className="hidden lg:block"
          />
          <h3 className="ml-2 text-sm font-medium">{name.full}</h3>
        </div>
        <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">{dob.age}</p>
        <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
          {location.city}
        </p>
      </div>
    </Link>
  )
}
