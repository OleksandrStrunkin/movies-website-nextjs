import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./ListItem.module.css";
import Image from "next/image";

export default function ListItems({
  poster,
  title,
  id,
  overview,
  rate,
  rDate,
}) {
  const router = usePathname();
  let adress = router.toString();

  return (
    <li
      key={id}
      className="flex w-full mt-8 border border-slate-600 rounded-md group hover:border-current transform duration-500"
    >
      <Link href={`${adress}/${id}`}>
        <div className="relative overflow-hidden">
          <img
            src={poster}
            alt="images"
            className="w-full object-cover object-center group-hover:opacity-60 duration-500"
          />
          <div
            className="absolute flex flex-col items-start gap-2 p-2 
          mt-0 h-max top-full left-0 w-full overflow-auto bg-opacity-90
           bg-slate-600 transform translate-y-0 transition-transform duration-500 
           group-hover:-translate-y-full"
          >
            <h3>Discription:</h3>
            <p className="">{overview}</p>
          </div>
        </div>
        <div className="flex flex-col py-4 text-center">
          <h2 className="group-hover:text-orange-200 duration-500">{title}</h2>
          <p>{rDate}</p>
          <p>Rate: {rate}</p>
        </div>
      </Link>
    </li>
  );
}

{
  /* <Image
src={poster}
alt="images"
width={250}
height={350}
className="w-full object-cover object-center"
/> */
}
