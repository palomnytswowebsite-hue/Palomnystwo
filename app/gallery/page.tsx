"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Link from "next/link";

import NavLinks from "../Components/navLinks";
import { NavMenu } from "../Components/navMenu";
import { Footer } from "../Components/footer";
import { FAB } from "../Components/FAB";
import ScrollToTop from "../Components/ScrollToTop";

interface CountryItem {
  slug: string;
  label: string;
  img?: string;
}

export default function GalleryPage() {
  const [countries, setCountries] = useState<CountryItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "Cities"));

      const cities = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as any[];

      const map = new Map<string, CountryItem>();

      cities.forEach((city) => {
        if (!Array.isArray(city.CountrySlug)) return;

        city.CountrySlug.forEach((slug: string, i: number) => {
          const label = city.Country?.[i] || slug;

          if (!map.has(slug)) {
            map.set(slug, {
              slug,
              label,
              img: city.img1,
            });
          } else {
            const existing = map.get(slug)!;

            if (!existing.img && city.img1) {
              existing.img = city.img1;
            }
          }
        });
      });

      const result = Array.from(map.values()).sort((a, b) =>
        a.label.localeCompare(b.label),
      );

      setCountries(result);
    };

    load();
  }, []);

  return (
    <div>
      <NavLinks />
      <NavMenu />

      <h1 className="marmelad-font bg-[#E6D8C3] m-0 p-2.5 text-3xl font-bold text-center text-[#5D866C]">
        Галерея подорожей
      </h1>

      <div className="max-w-6xl mx-auto p-10">
        <div className="grid md:grid-cols-3 gap-6">
          {countries.map((c) => (
            <Link
              key={c.slug}
              href={`/gallery/${c.slug}`}
              className="relative rounded-xl overflow-hidden group shadow-lg"
            >
              <img
                src={c.img || "/placeholder.jpg"}
                alt={c.label}
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
              />

              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <h2 className="text-white text-2xl font-bold">{c.label}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ScrollToTop />
      <FAB />
      <Footer />
    </div>
  );
}
