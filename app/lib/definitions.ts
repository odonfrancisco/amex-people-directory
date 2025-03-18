export type PeopleResults = {
  info: { page: number; results: number; seed: string; version: string }
  results: PersonData[]
}

export type PersonData = {
  name: Name
  location: Location
  email: string
  dob: Dob
  phone: string
  picture: Picture
}

export type Person = {
  name: string
  picture: Picture
  age: number
  city: string
}

export type Name = {
  title: string
  first: string
  last: string
}

export type Location = {
  street: {
    number: number
    name: string
  }
  city: string
  state: string
  country: string
  postcode: string
  coordinates: {
    latitude: string
    longitude: string
  }
  timezone: {
    offset: string
    description: string
  }
}

export type Dob = {
  date: string
  age: number
}

export type Picture = {
  large: string
  medium: string
  thumbnail: string
}
