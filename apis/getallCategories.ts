import { CategoryInterface } from "@/interfaces/CategoryInterface";

export default async function Getallcategories(): Promise<CategoryInterface[]> {
  try {
    const data = await fetch(`${process.env.Apiroute_v1}/categories`, {
      cache: "force-cache",
    });
    if (!data.ok) {
      throw new Error(`something went wrong`);
    }
    const category = await data?.json();

    return category?.data;
  } catch (error) {
    throw new Error("sever not found");
  }
}
