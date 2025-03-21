import Image from 'next/image'
import Link from 'next/link'

import { Person } from '@/src/lib/definitions'

export function PersonDetails({ person, page }: { person: Person; page: number }) {
  const { name, dob, location, picture, email, phone } = person

  return (
    <div>
      <h1>Person Details</h1>
      {
        <>
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

          <p>
            <strong>Name:</strong> {name.full}
          </p>
          <p>
            <strong>Age:</strong> {dob.age}
          </p>
          <p>
            <strong>Address:</strong> {location.street.number} {location.street.name}.{' '}
            {location.city}, {location.state}. {location.postcode} {location.country}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Date of Birth:</strong> {dob.date}
          </p>
          <p>
            <strong>Phone Number:</strong> {phone}
          </p>
          <Link href={`/people?page=${page}`} replace>
            <span className="border rounded-lg p-1 bg-amexBlue text-white">Back</span>
          </Link>
        </>
      }
    </div>
  )
}
