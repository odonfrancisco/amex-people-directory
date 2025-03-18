import { Person } from '@/app/lib/definitions'
import { PersonDetails } from '@/app/ui/people/person'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ person: string }>
}) {
  const params = await searchParams
  const person: Person = JSON.parse(params.person)

  return <PersonDetails person={person} />
}
