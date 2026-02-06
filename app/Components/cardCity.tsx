"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

interface City {
  id: string;
  Name: string;
  slug: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  description?: string;
  Country: string[];
}

interface CardCityProps {
  cities?: City[]; // якщо передані через пропс
}

export const CardCity = ({ cities: initialCities }: CardCityProps) => {
  const [cities, setCities] = useState<City[]>(initialCities || []);
  const [loading, setLoading] = useState(!initialCities?.length);
  const [error, setError] = useState<string | null>(null);

  // Якщо пропсів немає, підвантажуємо всі тури
  useEffect(() => {
    if (initialCities && initialCities.length) return;

    const fetchCities = async () => {
      try {
        const snapshot = await getDocs(collection(db, "1City"));
        const data: City[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as City[];
        setCities(data);
      } catch (err) {
        console.error("Firestore error:", err);
        setError("Не вдалося завантажити дані з бази");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [initialCities]);

  if (loading) return <p className="text-center mt-10">Завантаження...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!cities.length)
    return <p className="text-center mt-10">Турів не знайдено</p>;

  return (
    <div className="flex flex-wrap justify-center gap-10 mr-7 ml-7 mt-10 mb-10 bg-white">
      {cities.map((city) => (
        <div key={city.id} className="card w-96 shadow-sm mb-10 bg-white">
          <figure className="px-10 pt-10">
            <img
              src={
                city.img1 ??
                "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              }
              alt={city.Name}
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{city.Name}</h2>
            <p>{city.description}</p>
            <div className="card-actions">
              <Link href={`/cities/${city.slug}`} className="btn btn-primary">
                Детальніше
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
