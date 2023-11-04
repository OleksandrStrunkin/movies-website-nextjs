import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryList({
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
      className={`w-full min-h-max overflow-hidden border border-slate-600 rounded-md group hover:border-current transform duration-500`}
    >
      <Link href={`${adress}/${id}`}>
        <div className={`relative overflow-hidden`}>
          <img
            src={poster}
            alt="images"
            className="w-[210px] h-[300px] object-fill"
          />
        </div>
        <div className="absolute flex flex-col items-start gap-2 p-2 
          mt-0 h-max top-full left-0 w-full overflow-auto bg-opacity-90
           bg-slate-600/60 transform -translate-y-0 transition-transform duration-500 
           group-hover:-translate-y-full group-hover:bg-slate-600/90">
          <h2 className="text-xl">{title}</h2>
          <p className="text-xs"><span className="mr-1">Date Release:</span>{formattedDate}</p>
          <p className="text-xs">Rate: {rate}</p>
        </div>
      </Link>
    </li>
  );
}