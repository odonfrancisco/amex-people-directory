import Image from 'next/image'
import Link from 'next/link'

import { Person } from '@/src/lib/definitions'

export default function PeopleWrapper({ people, page }: { people: Person[]; page: number }) {
  return (
    <>
      {/* I believe I don't need to set the param type as Person here since it's already set on line 5 */}
      {!people ? (
        <p>No people returned </p>
      ) : (
        people.map(person => (
          <PersonCard
            person={person}
            page={page}
            key={person._id || `${person.name.full}-${person.location.city}`}
          />
        ))
      )}
    </>
  )
}

export function PersonCard({ person, page }: { person: Person; page: number }) {
  const { name, picture, dob, location } = person

  return (
    <Link
      href={{
        pathname: `/people/${person._id || name.full}`,
        // While this is a simple solution, it does make for ugly URLS. Would not use this method for sensitive data
        //(fixed) Honestly using a DB would be cleaner... just seems weird for this use case. Would also be better to save all the people data in db rather than cookies, it's not scalable
        // Keeping for demo purposes (app works with & without DB cnx)
        // Technically the page prop already exists within the person object but this is to ensure this works even if that were not the case
        query: { person: JSON.stringify(person), page },
      }}
    >
      <div className="rounded-xl bg-gr2ay-50 p-2 shadow-sm min-h-full">
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
