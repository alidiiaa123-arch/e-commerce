export interface Root {
  data: SpecificCategoryInterface;
}

export interface SpecificCategoryInterface {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
