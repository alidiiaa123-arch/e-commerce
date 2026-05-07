import { SpecificCategoryInterface } from "@/interfaces/SpecificCategoryInterface";

export default async function GetspecificCatygory(
  id: string,
): Promise<SpecificCategoryInterface> {
  try {
    const data = await fetch(`${process.env.Apiroute_v1}/categories/${id}`);
    if (!data.ok) {
      throw new Error(`something went wrong`);
    }
    const category = await data?.json();

    return category?.data;
  } catch {
    throw new Error("server error");
  }
}
