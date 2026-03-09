"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Link from "next/link";

export default function GalleryPage() {
  const [countries, setCountries] = useState<{ slug: string; label: string }[]>(
    [],
  );

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "Cities"));

      const cities = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const list = cities.flatMap((city: any) => {
        if (!Array.isArray(city.CountrySlug)) return [];

        return city.CountrySlug.map((slug: string, i: number) => ({
          slug,
          label: city.Country?.[i] || slug,
        }));
      });

      const unique = Array.from(new Map(list.map((c) => [c.slug, c])).values());

      setCountries(unique);
    };

    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-3xl mb-8">Галерея подорожей</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {countries.map((c) => (
          <Link
            key={c.slug}
            href={`/gallery/${c.slug}`}
            className="border p-6 rounded-lg hover:shadow-lg transition"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
