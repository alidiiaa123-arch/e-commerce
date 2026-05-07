export interface Root {
  results: number
  metadata: Metadata
  data: CategoryInterface[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
}

export interface CategoryInterface{
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
