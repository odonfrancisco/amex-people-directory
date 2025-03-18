import { getPeople } from '@/app/lib/data'
import PeopleWrapper from '@/app/ui/people/people-cards'

export default async function Page() {
  const { results } = await getPeople()

  return (
    <main>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <PeopleWrapper people={results} />
      </div>
    </main>
  )
}
