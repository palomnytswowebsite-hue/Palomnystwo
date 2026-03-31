"use client";
import Link from "next/link";
import { City } from "../Components/HomeClient";

export const CardCity = ({ city }: { city: City }) => {
  return (
    <div className="sm:w-96">
      <div className="card bg-white shadow">
        <figure className="px-10 pt-10">
          <img
            src={city.img0 || city.img1 || "/fallback.jpg"}
            alt={city.Name}
            className="rounded-xl"
          />
        </figure>

        <div className="card-body text-center">
          <h2 className="text-lg font-semibold">{city.Name}</h2>

          {city.nearestDate && (
            <p className="text-sm text-green-600">{city.nearestDate}</p>
          )}

          <p className="font-semibold text-[#5D866C]">
            {city.TourPrice || "Ціна уточнюється"}
          </p>

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
