import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ListItems({
  poster,
  title,
  id,
  overview,
  rate,
  rDate,
  index
}) {
  const router = usePathname();
  let adress = router.toString();

  const dateObject = new Date(rDate);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = dateObject.toLocaleDateString('en-GB', options);

  return (
    <li
      key={id}
      className={`flex w-max h-max lg:h-72 mt-8 basis-1/2 hover:basis-full overflow-hidden border border-slate-600 rounded-md group hover:border-current transform duration-500`}
    >
      <Link href={`${adress}/${id}`}>
        <div className={`relative overflow-hidden`}>
          <img
            src={poster}
            alt="images"
            className="w-max h-[400px] lg:h-full object-center object-cover"
          />
        </div>
        <div className="flex flex-col py-2 text-center absolute top-0 right-0 w-full rounded-md bg-slate-600/90 translate-x-full group-hover:translate-x-0 duration-500">
          <h2 className="text-xl">{title}</h2>
          <p className="text-xs"><span className="mr-1">Date Release:</span>{formattedDate}</p>
          <p className="text-xs">Rate: {rate}</p>
        </div>
      </Link>
    </li>
  );
}

// ${index === 0 ? "w-full": ""}