"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

const CountryPage = () => {
  const { country } = useParams();
  const countryName = decodeURIComponent(country as string);

  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      const q = query(
        collection(db, "tours"),
        where("Countries", "array-contains", countryName),
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTours(data);
      setLoading(false);
    };

    fetchTours();
  }, [countryName]);

  if (loading) return <p>Завантаження...</p>;
  if (!tours.length) return <p>Турів не знайдено</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Тури в {countryName}</h1>

      {tours.map((tour) => (
        <div key={tour.id} className="mb-6 border rounded-xl p-4">
          <h2 className="text-xl font-semibold">{tour.Name}</h2>
          <p>{tour.Route}</p>
          <p>
            <strong>Ціна:</strong> {tour.TourPrice}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CountryPage;
