"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useParams } from "next/navigation";

import NavLinks from "@/app/Components/navLinks";
import { NavMenu } from "@/app/Components/navMenu";
import { Footer } from "@/app/Components/footer";
import { FAB } from "@/app/Components/FAB";
import ScrollToTop from "@/app/Components/ScrollToTop";

interface Place {
  id: string;
  Name: string;
  slug: string;
  description: string;
}

export default function PlaceDetailPage() {
  const params = useParams();

  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0];

  const [place, setPlace] = useState<Place | null>(null);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "InterestingPlace"));

      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Place[];

      const found = list.find((p) => p.slug === slug);

      setPlace(found || null);
    };

    if (slug) load();
  }, [slug]);

  if (!place) return <p className="p-10">Завантаження...</p>;

  return (
    <div>
      <NavLinks />
      <NavMenu />

      <div className="card bg-white shadow">
        <figure className="px-10 pt-10">
          <img
            src="https://res.cloudinary.com/dwl1expbx/image/upload/v1770135112/grayFotoCity_a3ccak.jpg"
            alt=""
            className="rounded-xl"
          />
        </figure>

        <div className="card-body text-center">
          <h2 className="text-lg font-semibold">{place.Name}</h2>
          {/* {city.nearestDate && (
              <p className=" text-sm text-green-600">
                Найближча дата: {city.nearestDate}
              </p>
            )} */}

          {/* {typeList.length > 0 && <p>{typeList.join(", ")}</p>}
            {countryList.length > 0 && <p>{countryList.join(", ")}</p>} */}

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

          {/* <Link
              href={`/cities/${city.slug}`}
              target="_blank"
              className="btn text-white bg-[#5D866C]"
            >
              Детальніше
            </Link> */}
        </div>
      </div>

      <ScrollToTop />
      <FAB />
      <Footer />
    </div>
  );
}
