import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React, { FC } from "react";

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
      className="flex justify-center items-center w-full h-full py-12 overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg})`,
          filter: "brightness(45%)",
          width: "100%", 
        }}
      ></div>
      <Link
        href={`${address}/${id}`}
        className="flex items-center justify-center my-10 z-10 p-1 md:max-w-3xl bg-rose-200/50 hover:bg-rose-300/50 duration-300 rounded-lg"
      >
        <div className="flex items-start w-full h-full">
          <Image
            width={250}
            height={350}
            src={poster}
            alt="Poster"
            className="object-cover rounded-lg"
          />
          <div className="flex gap-4 flex-col items-start justify-start p-4 text-left text-white">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-xm text-white/80">{overview}</p>
            <p className="">Release Date: {formattedDate}</p>
            <p className="">Rate: {rate}</p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default TopDayItems;
