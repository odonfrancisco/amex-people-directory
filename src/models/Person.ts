import mongoose from 'mongoose'

const PersonSchema = new mongoose.Schema({
  name: {
    title: String,
    first: String,
    last: String,
    full: String,
  },
  location: {
    street: {
      number: Number,
      name: String,
    },
    city: String,
    state: String,
    country: String,
    postcode: String,
    coordinates: {
      latitude: String,
      longitude: String,
    },
    timezone: {
      offset: String,
      description: String,
    },
  },
  email: String,
  dob: {
    date: String,
    age: Number,
  },
  phone: String,
  picture: {
    large: String,
    medium: String,
    thumbnail: String,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  page: Number,
})

export const Person = mongoose.models.Person || mongoose.model('Person', PersonSchema)
