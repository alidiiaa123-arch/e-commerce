import { CategoryInterface } from "@/interfaces/CategoryInterface";
import Image from "next/image";
import Link from "next/link";
export default function CategoryCard({
  categoryData,
}: {
  categoryData: CategoryInterface;
}) {
  return (
    <>
      <div className=" hover:scale-[1.01]  duration-100 transition-all">
        <Link
          href={`categoryDetails/${categoryData._id}`}
          className="rounded-[8px] p-4  flex justify-center items-center flex-col gap-3  shadow-accent text-[12px] shadow"
        >
          <Image
            src={categoryData.image}
            width={80}
            height={80}
            className=" size-20 object-cover rounded-full"
            alt={categoryData.name}
          />
          <p className="text-center ">{categoryData.name}</p>
        </Link>
      </div>
    </>
  );
}
