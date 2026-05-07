import Getallcategories from "@/apis/getallCategories";
import CtegoriesComponent from "./CtegoriesComponent";

export default async function Categories() {
  const data = await Getallcategories();

  return (
    <>
      <div>
        <CtegoriesComponent data={data} />
      </div>
    </>
  );
}
