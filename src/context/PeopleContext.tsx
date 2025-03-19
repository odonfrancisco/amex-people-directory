import { Person } from '@/src/lib/definitions'
import { createContext, useContext, useState, ReactNode } from 'react'

type PeopleContextType = {
  selectedPerson: Person
  setSelectedPerson: (person: Person) => void
}

const PeopleContext = createContext<PeopleContextType | undefined>(undefined)

export function PeopleProvider({ children }: { children: ReactNode }) {
  const [selectedPerson, setSelectedPerson] = useState<Person>(null)

  return (
    <PeopleContext.Provider value={{ selectedPerson, setSelectedPerson }}>
      {children}
    </PeopleContext.Provider>
  )
}

// Why is this called usePeople?
// use people context is my guess.
export function usePeople() {
  const context = useContext(PeopleContext)
  if (!context) throw new Error('usePeople must be used within a PeopleProvider')

  return context
}
