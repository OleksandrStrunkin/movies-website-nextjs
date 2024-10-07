import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FC } from "react";

interface TopDayItemsProps {
  poster: string;
  title: string;
  id: string;
  overview: string;
  rate: number;
  rDate: string;
  bg: string,
}

const TopDayItems: FC<TopDayItemsProps> = ({
  poster,
  title,
  id,
  overview,
  rate,
  rDate,
  bg,
}) => {
  const router = usePathname();
  let address = router.toString();

  const dateObject = new Date(rDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = dateObject.toLocaleDateString("en-GB", options);

  return (
    <li
      key={id}
      className=" flex justify-center w-full h-96 mt-8 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
          filter: 'brightness(45%)',
          zIndex: 1,
        }}
      ></div>
      <Link href={`${address}/${id}`} className="relative flex items-center justify-center z-10 bg-transparent md:max-w-3xl">
        <div className="flex items-center w-full h-full">
          <Image
            width={250}
            height={350}
            src={poster}
            alt="Poster"
            className="object-cover"
          />
          <div className="z-10 p-4 text-left text-white">
            <h2 className="text-4xl font-bold">{title}</h2>
            <p className="mt-2 text-xl">{overview}</p>
            <p className="mt-4">Release Date: {formattedDate}</p>
            <p className="mt-2">Rate: {rate}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default TopDayItems;
