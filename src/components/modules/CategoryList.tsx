import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function CategoryList({
  poster,
  title,
  id,
  overview,
  rate,
  rDate,
  index,
}) {
  const router = usePathname();
  let adress = router.toString();

  const dateObject = new Date(rDate);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-GB", options);

  const dateR = rDate.slice(0, 4);

  return (
    <li
      key={id}
      className={`md:w-full min-h-max border border-gray-600 relative group`}
    >
      <Link href={`${adress}/${id}`}>
        <div className={`relative overflow-hidden`}>
          <Image
            src={poster}
            alt="images"
            className="object-fill group-hover:scale-150 duration-300"
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-col items-center p-2">
          <h2 className="text-xm overflow-hidden text-ellipsis whitespace-nowrap w-full max-w-full text-center">
            {title}
          </h2>
          <p className="text-xs text-gray-600/80">{dateR}</p>
        </div>
      </Link>
      <p className="text-sm absolute top-0 right-0 bg-red-500 text-white p-1">{rate.toFixed(1)}</p>
    </li>
  );
}
