"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useParams } from "next/navigation";

interface City {
  id: string;
  Name: string;
  slug: string;
  img1?: string;
  Country: string[];
  CountrySlug: string[];
}

export default function CountryGalleryPageClient() {
  const params = useParams();
  // Якщо params.country — масив, беремо перший елемент, інакше рядок
  const countryParam = Array.isArray(params.country)
    ? params.country[0]
    : params.country;
  const countrySlug = countryParam?.toLowerCase() || "";

  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCities = async () => {
      const snap = await getDocs(collection(db, "Cities"));
      const allCities: City[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as City[];

      const filtered = allCities.filter(
        (city) =>
          Array.isArray(city.CountrySlug) &&
          city.CountrySlug.some((slug) => slug.toLowerCase() === countrySlug),
      );

      setCities(filtered);
      setLoading(false);
    };

    if (countrySlug) loadCities();
  }, [countrySlug]);

  if (loading) return <p>Завантаження турів...</p>;
  if (cities.length === 0) return <p>Тури для цієї країни не знайдені.</p>;

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-3xl mb-8">Тури для {countryParam}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {cities.map((c) => (
          <div
            key={c.slug}
            className="border p-6 rounded-lg hover:shadow-lg transition"
          >
            {c.img1 && (
              <img
                src={c.img1}
                alt={c.Name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
            )}
            <h2 className="text-xl font-semibold">{c.Name}</h2>
            <p className="text-gray-500">{c.Country.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
