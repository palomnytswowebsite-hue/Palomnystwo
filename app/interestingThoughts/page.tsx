"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Link from "next/link";
import NavLinks from "../Components/navLinks";
import { NavMenu } from "../Components/navMenu";
import { Footer } from "../Components/footer";
import { FAB } from "../Components/FAB";

interface Place {
  id: string;
  Name: string;
  slug: string;
  description: string;
}

export default function InterestingPlacePage() {
  const [thoughts, setThoughts] = useState<Place[]>([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const snap = await getDocs(collection(db, "InterestingThoughts"));
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Place[];
      setThoughts(list);
    };
    loadPlaces();
  }, []);

  return (
    <div className="">
      <NavLinks />
      <NavMenu />
      <h1 className="marmelad-font bg-[#E6D8C3] m-0 p-2.5 text-3xl font-bold text-center text-[#5D866C]">
        Думки
      </h1>
      <div className="max-w-6xl mx-auto p-10">
        <div className="grid md:grid-cols-2 gap-6">
          {thoughts.map((thought) => (
            <div className="card bg-white shadow">
              <figure className="px-10 pt-10">
                {/* <img
                        src="https://res.cloudinary.com/dwl1expbx/image/upload/v1770135112/grayFotoCity_a3ccak.jpg"
                        className="rounded-xl"
                      /> */}
              </figure>

              <div className="card-body text-center">
                <h2 className="text-lg font-semibold">{thought.Name}</h2>
                <p>{thought.description}</p>
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
              </div>
            </div>
          ))}
        </div>
      </div>
      <FAB />
      <Footer />
    </div>
  );
}
