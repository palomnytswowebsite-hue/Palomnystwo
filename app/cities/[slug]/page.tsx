"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { NavMenu } from "@/app/Components/navMenu";
import NavLinks from "@/app/Components/navLinks";

/* ===================== TYPES ===================== */

interface City {
  id: string;
  Name: string;
  slug: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  description?: string;
  DateOfBeggining?: string;
  DateOfEnd?: string;
  Route?: string;
  TourPrice?: string;
  INCLUDES?: string | string[];
  NOTINCLUDE?: string[];
  Country?: string | string[];
  Day1?: string;
  Day2?: string;
  Day3?: string;
  Day4?: string;
  Day5?: string;
  Day6?: string;
  Day7?: string;
  Day8?: string;
  Day9?: string;
  Day10?: string;
  Day11?: string;
  ImportantInfo?: string;
}

/* ===================== HELPERS ===================== */

const normalizeToArray = (value?: string | string[]) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string")
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  return [];
};

const hasValue = (value?: string) =>
  typeof value === "string" && value.trim() !== "";

/* ===================== PAGE ===================== */

const CityPage = ({
  selectedType,
  selectedCountry,
  setType,
  setCountry,
}: {
  selectedType?: string;
  selectedCountry?: string;
  setType: (v?: string) => void;
  setCountry: (v?: string) => void;
}) => {
  const bgBackRef = useRef<HTMLDivElement>(null);
  const bgFrontRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const params = useParams();
  const rawSlug = params.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  /* ===================== Паралакс ===================== */
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (bgBackRef.current)
        bgBackRef.current.style.transform = `translateY(${offset * 0.2}px)`;
      if (bgFrontRef.current)
        bgFrontRef.current.style.transform = `translateY(${offset * 0.5}px)`;
      if (textRef.current)
        textRef.current.style.transform = `translateY(${offset * 0.3}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===================== Завантаження даних ===================== */
  useEffect(() => {
    const fetchCity = async () => {
      if (!slug) return;

      try {
        const snapshot = await getDocs(collection(db, "1City"));
        const citiesData: City[] = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as City,
        );

        const foundCity = citiesData.find((c) => c.slug === slug) || null;
        setCity(foundCity);
      } catch (error) {
        console.error("Error loading city:", error);
        setCity(null);
      } finally {
        setLoading(false);
      }
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

        {/* Галерея */}
        {/* <div className="hover-gallery max-w-60 mb-4 flex flex-wrap gap-2">
          {normalizeToArray([city.img1, city.img2, city.img3, city.img4]).map(
            (img: string, idx) => (
              <img
                key={idx}
                src={img}
                alt={city.Name || "Тур"}
                className="w-48 h-32 object-cover rounded"
              />
            ),
          )}
        </div> */}

        {hasValue(city.description) && (
          <p className="mb-2">{city.description}</p>
        )}

        {/* Дати */}
        {hasValue(city.DateOfBeggining) && hasValue(city.DateOfEnd) && (
          <p className="mb-2">
            <strong>Дати:</strong> {city.DateOfBeggining} – {city.DateOfEnd}
          </p>
        )}

        {/* Країни */}
        {normalizeToArray(city.Country).length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Країни туру:</h2>
            <ul className="list-disc list-inside">
              {normalizeToArray(city.Country).map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Маршрут */}
        {hasValue(city.Route) && (
          <p className="mb-2">
            <strong>Маршрут:</strong> {city.Route}
          </p>
        )}

        {/* Ціна */}
        {hasValue(city.TourPrice) && (
          <p className="mb-2">
            <strong>Ціна:</strong> {city.TourPrice}
          </p>
        )}

        {/* Що включено */}
        {normalizeToArray(city.INCLUDES).length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Що включено в тур:</h2>
            <ul className="list-disc list-inside">
              {normalizeToArray(city.INCLUDES).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Що не включено */}
        {normalizeToArray(city.NOTINCLUDE).length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Що не включено:</h2>
            <ul className="list-disc list-inside">
              {normalizeToArray(city.NOTINCLUDE).map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Маршрут по днях */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Маршрут по днях:</h2>
          <div className="space-y-4">
            {Object.entries(city)
              .filter(
                ([key, value]) => key.startsWith("Day") && hasValue(value),
              )
              .sort(
                ([a], [b]) =>
                  parseInt(a.replace("Day", ""), 10) -
                  parseInt(b.replace("Day", ""), 10),
              )
              .map(([key, value]) => (
                <div key={key} className="bg-base-100 p-4 rounded shadow-sm">
                  <h3 className="font-semibold mb-1">
                    День {key.replace("Day", "")}:
                  </h3>
                  <p>{value}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Важлива інформація */}
        {hasValue(city.ImportantInfo) && (
          <div className="mt-6 p-4 bg-warning/10 rounded">
            <h2 className="font-bold mb-2">Важлива інформація</h2>
            <p>{city.ImportantInfo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityPage;
