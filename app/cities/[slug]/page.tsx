"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const CityPage = () => {
  const params = useParams();
  const rawSlug = params.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const [city, setCity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCity = async () => {
      if (!slug) return;

      // Firestore не знає slug як id → робимо запит колекції з фільтром
      const snapshot = await getDocs(collection(db, "1City"));
      const citiesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));
      const foundCity = citiesData.find((c) => c.slug === slug);
      setCity(foundCity || null);
      setLoading(false);
    };

    fetchCity();
  }, [slug]);

  if (loading) return <p>Завантаження...</p>;
  if (!city) return <p>Тур не знайдено</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{city.Name}</h1>
      <figure className="hover-gallery max-w-60">
        <img src={city.img1} alt={city.Name} />
        <img src={city.img2} alt={city.Name} />
        <img src={city.img3} alt={city.Name} />
        <img src={city.img4} alt={city.Name} />
      </figure>
      <p>{city.description}</p>
      <p>
        <strong>Дати:</strong> {city.DateOfBeggining} – {city.DateOfEnd}
      </p>
      <p>
        <strong>Маршрут:</strong> {city.Route}
      </p>
      <p>
        <strong>Ціна:</strong> {city.TourPrice}
      </p>
    </div>
  );
};

export default CityPage;
