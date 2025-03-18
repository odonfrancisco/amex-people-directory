import Image from 'next/image'

import { Person, Picture } from '@/app/lib/definitions'

export default async function PeopleWrapper({ people }: { people: Person[] }) {
  return (
    <>
      {/* I believe I don't need to set the param type as Person here since it's already set on line 5 */}
      {people.map(({ name, picture, age, city }) => (
        <PersonCard
          name={name}
          picture={picture}
          age={age}
          city={city}
          // I want to use person.ID for key but not all people return a valid ID prop.
          key={`${name}-${city}`}
        />
      ))}
    </>
  )
}

export function PersonCard({
  name,
  picture,
  age,
  city,
}: {
  name: string
  picture: Picture
  age: number
  city: string
}) {
  return (
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
        <h3 className="ml-2 text-sm font-medium">{name}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">{age}</p>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">{city}</p>
    </div>
  )
}
