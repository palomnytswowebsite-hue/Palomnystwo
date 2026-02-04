"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

interface City {
  id: string;
  Name: string;
  img?: string;
  description?: string;
}

export const CardCity = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
  }, []);

  if (loading) return <p>Завантаження даних...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="flex flex-wrap justify-center gap-10 mt-10 mb-10 bg-white">
      {cities.map((city) => (
        <div key={city.id} className="card w-96 shadow-sm mb-10 bg-white">
          <figure className="px-10 pt-10">
            <img
              src={
                city.img ??
                "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              }
              alt={city.Name ?? "City"}
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{city.Name ?? "Card Title"}</h2>
            <p>
              {city.description ??
                "A card component has a figure, a body part, and inside body there are title and actions parts"}
            </p>
            <div className="card-actions">
              <button className="w-60 bg-blue-400">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
