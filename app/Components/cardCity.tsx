"use client";
import "../globals.css";
import Link from "next/link";
import { City } from "../Components/HomeClient";

interface Props {
  city: City;
}

export const CardCity = ({ city }: Props) => {
  const countryList = Array.isArray(city.Country) ? city.Country : [];

  const formattedDate = city.DateOfBeggining
    ? (() => {
        const [day, month, year] = city.DateOfBeggining.split(".");
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        return isNaN(date.getTime()) ? "" : date.toLocaleDateString();
      })()
    : "";

  return (
    <div className=" sm:w-96">
      <div className="card bg-white shadow">
        <figure className="px-10 pt-10">
          <img
            src={
              city.img1 ||
              "https://res.cloudinary.com/dwl1expbx/image/upload/v1770135112/grayFotoCity_a3ccak.jpg"
            }
            alt={city.Name}
            className="rounded-xl "
          />
        </figure>

        <div className="card-body text-center">
          <h2 className="text-center text-lg font-semibold">{city.Name}</h2>
          <p>{city.typeUa.join(", ")}</p>
          <p>{countryList.join(", ")}</p>
          {formattedDate && (
            <p className="text-sm text-gray-500">{formattedDate}</p>
          )}
          <Link
            href={`/cities/${city.slug}`}
            target="_blank"
            className="btn text-white bg-[#5D866C]"
          >
            Детальніше
          </Link>
        </div>
      </div>
    </div>
  );
};
