export type HoundCollection = "adopted" | "available" | "foxhounds"

export type AdoptedHound = {
  id: string
  name: string
  images: string[]
  adoptedDate: string
  description: string
}

export type AvailableHound = {
  id: string
  name: string
  images: string[]
  origin: string
  description: string
}

export type Foxhound = {
  id: string
  name: string
  image: string
  sfsbNumber: string | null
  sex: string
  whelped: string
  litterNumber: string | null
  sire: string
  gyp: string
}

export type HoundRecord = AdoptedHound | AvailableHound | Foxhound
