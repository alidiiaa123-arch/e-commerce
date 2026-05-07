export interface Root {
  results: number;
  metadata: Metadata;
  data: supcategoryBasedonCategoryInterface[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface supcategoryBasedonCategoryInterface {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
