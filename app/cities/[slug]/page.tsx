"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { NavMenu } from "@/app/Components/navMenu";
import NavLinks from "@/app/Components/navLinks";

interface City {
  id: string;
  Name: string;
  slug: string;
  img1: string;
  img2: string;
  img3: string;
  img4: string;
  description: string;
  DateOfBeggining: string;
  DateOfEnd: string;
  Route: string;
  TourPrice: string;
  INCLUDES: string[];
  NOTINCLUDE: string[];
  Country: string[];
  Day1: string;
  Day2: string;
  Day3: string;
  Day4: string;
  Day5: string;
  Day6: string;
  Day7: string;
  Day8: string;
  Day9: string;
  Day10: string;
  Day11: string;
  ImportantInfo: string;
}

interface Props {
  selectedType?: string;
  selectedCountry?: string;
  setType: (v?: string) => void;
  setCountry: (v?: string) => void;
}

const CityPage = ({
  selectedType,
  selectedCountry,
  setType,
  setCountry,
}: Props) => {
  const bgBackRef = useRef<HTMLDivElement>(null);
  const bgFrontRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const params = useParams();
  const rawSlug = params.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  // Паралакс-анімація
  useEffect(() => {
    const handleScroll = () => {
      if (bgBackRef.current && bgFrontRef.current && textRef.current) {
        const offset = window.scrollY;
        bgBackRef.current.style.transform = `translateY(${offset * 0.2}px)`;
        bgFrontRef.current.style.transform = `translateY(${offset * 0.5}px)`;
        textRef.current.style.transform = `translateY(${offset * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Завантаження даних з Firestore
  useEffect(() => {
    const fetchCity = async () => {
      if (!slug) return;

      const snapshot = await getDocs(collection(db, "1City"));
      const citiesData: City[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<City, "id">; // прибираємо id з даних
        return { id: doc.id, ...data }; // id беремо тільки з doc.id
      });

      const foundCity = citiesData.find((c) => c.slug === slug) || null;
      setCity(foundCity);
      setLoading(false);
    };

    fetchCity();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Завантаження...</p>;
  if (!city) return <p className="text-center mt-10">Тур не знайдено</p>;

  return (
    <div>
      <NavLinks />

      <NavMenu
        selectedType={selectedType}
        selectedCountry={selectedCountry}
        setType={setType}
        setCountry={setCountry}
      />
      <div className="max-w-4xl mx-auto p-6">
        <h1 ref={textRef} className="text-3xl font-bold mb-4">
          {city.Name}
        </h1>

        <div className="hover-gallery max-w-60 mb-4">
          <img src={city.img1} alt={city.Name} />
          <img src={city.img2} alt={city.Name} />
          <img src={city.img3} alt={city.Name} />
          <img src={city.img4} alt={city.Name} />
        </div>

        <p className="mb-2">{city.description}</p>

        <p className="mb-2">
          <strong>Дати:</strong> {city.DateOfBeggining} – {city.DateOfEnd}
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Країни туру:</h2>
          <ul className="list-disc list-inside">
            {city.Country.map((country, index) => (
              <li key={index}>{country}</li>
            ))}
          </ul>
        </div>
        <p className="mb-2">
          <strong>Маршрут:</strong> {city.Route}
        </p>

        <p className="mb-2">
          <strong>Ціна:</strong> {city.TourPrice}
        </p>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Що включено в тур:</h2>
          <ul className="list-disc list-inside">
            {city.INCLUDES.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Що не включено:</h2>
          <ul className="list-disc list-inside">
            {city.NOTINCLUDE.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Маршрут по днях:</h2>
          <div className="space-y-4">
            {Object.entries(city)
              .filter(
                ([key, value]) =>
                  key.startsWith("Day") && value && value.trim() !== "",
              )
              .sort(([a], [b]) => {
                const dayA = parseInt(a.replace("Day", ""), 10);
                const dayB = parseInt(b.replace("Day", ""), 10);
                return dayA - dayB;
              })
              .map(([key, value]) => {
                const dayNumber = key.replace("Day", "");
                return (
                  <div key={key} className="bg-base-100 p-4 rounded shadow-sm">
                    <h3 className="font-semibold mb-1">День {dayNumber}:</h3>
                    <p>{value}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPage;
