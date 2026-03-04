"use client";
import "../globals.css";
import Link from "next/link";
import { City } from "../Components/HomeClient";

interface Props {
  city: City;
}

export const CardCity = ({ city }: Props) => {
  const countryList = Array.isArray(city.Country) ? city.Country : [];
  const typeList = Array.isArray(city.typeUa) ? city.typeUa : [];

  return (
    <div className="sm:w-96">
      <div className="card bg-white shadow">
        <figure className="px-10 pt-10">
          <img
            src={
              city.img1 ||
              "https://res.cloudinary.com/dwl1expbx/image/upload/v1770135112/grayFotoCity_a3ccak.jpg"
            }
            alt={city.Name}
            className="rounded-xl"
          />
        </figure>

        <div className="card-body text-center">
          <h2 className="text-lg font-semibold">{city.Name}</h2>
          {city.nearestDate && (
            <p className=" text-sm text-green-600">
              Найближча дата: {city.nearestDate}
            </p>
          )}
          {typeList.length > 0 && <p>{typeList.join(", ")}</p>}
          {countryList.length > 0 && <p>{countryList.join(", ")}</p>}

          {/* {city.allDates && city.allDates.length > 0 && (
            <div className="mt-2">
              <h3 className="font-semibold">Тури:</h3>
              <ul className="text-sm text-gray-500">
                {city.allDates.map((d, i) => (
                  <li key={i}>{d.label}</li>
                ))}
              </ul>
            </div>
          )} */}

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
