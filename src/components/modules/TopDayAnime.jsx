import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopDayAnime({
  poster,
  title,
  id,
  overview,
  rate,
  rDate,
  ind,
}) {
  const router = usePathname();
  let adress = router.toString();

const dateObject = new Date(rDate);
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = dateObject.toLocaleDateString('en-GB', options);

  return (
    <li
      key={id}
      className="flex relative justify-center overflow-hidden w-full mt-8 border border-slate-600 rounded-md group hover:border-current transform duration-500"
    >
      <Link href={`${adress}/${id}`}>
        <div className="">
          <img
            src={poster}
            alt="images"
            className="object-center h-full w-full object-contain"
          />
          <div className="absolute flex flex-col items-start gap-2 p-2 
          mt-0 h-max top-full left-0 w-full overflow-auto bg-opacity-90
           bg-slate-600/60 transform -translate-y-20 transition-transform duration-500 
           group-hover:-translate-y-full group-hover:bg-slate-600/90">
            <h2 className="text-2xl pb-2 h-20 group-hover:h-full duration-500">
              {title}
            </h2>
            <p className="text-xs pb-2">{overview}</p>
            <p className="pb-2 sm">Date Release:{formattedDate}</p>
            <p>Rate: {rate}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}