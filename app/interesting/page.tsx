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
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const loadPlaces = async () => {
      const snap = await getDocs(collection(db, "InterestingPlace"));
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Place[];
      setPlaces(list);
    };
    loadPlaces();
  }, []);

  return (
    <div className="">
      <NavLinks />
      <NavMenu />
      <h1 className="marmelad-font bg-[#E6D8C3] m-0 p-2.5 text-3xl font-bold text-center text-[#5D866C]">
        Цікаві місця
      </h1>

      <div className="max-w-6xl mx-auto p-10">
        <div className="grid md:grid-cols-2 gap-6">
          {places.map((place) => (
            <Link
              key={place.id}
              href={`/interesting/${place.slug}`}
              className="border rounded-xl p-6 hover:shadow-lg transition bg-amber-50"
            >
              <h2 className="text-xl font-bold mb-2">{place.Name}</h2>
              <p className="text-sm opacity-70 line-clamp-3">
                {place.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <FAB />
      <Footer />
    </div>
  );
}
