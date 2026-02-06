"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

interface CountryData {
  Country: string;
  CountryUa: string;
  id: string; // для унікального ключа
}

export const NavMenu = () => {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const allCountries: CountryData[] = [];
        const collectionsToFetch = ["1CityOfPalomnystwo", "3CityOfPalomnystwo"];

        for (const collName of collectionsToFetch) {
          const snapshot = await getDocs(collection(db, collName));

          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            console.log("Doc data:", doc.id, data); // перевірка даних

            // --- якщо Country та CountryUa масиви ---
            if (Array.isArray(data.Country) && Array.isArray(data.CountryUa)) {
              data.Country.forEach((country: string, index: number) => {
                allCountries.push({
                  Country: country.trim(),
                  CountryUa: (data.CountryUa[index] || country).trim(),
                  id: doc.id + "-" + index, // унікальний ключ
                });
              });
            }
            // --- якщо Country та CountryUa рядки ---
            else if (typeof data.Country === "string") {
              allCountries.push({
                Country: data.Country.trim(),
                CountryUa:
                  typeof data.CountryUa === "string"
                    ? data.CountryUa.trim()
                    : data.Country.trim(),
                id: doc.id,
              });
            }
          });
        }

        // Робимо список унікальним за англійською назвою
        const uniqueCountries = Array.from(
          new Map(allCountries.map((c) => [c.Country, c])).values(),
        );

        setCountries(uniqueCountries);
      } catch (err) {
        console.error(err);
        setError("Не вдалося завантажити країни");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const renderCountries = () => {
    if (loading) return <li>Завантаження...</li>;
    if (error) return <li className="text-red-500">{error}</li>;

    return countries.map((country) => (
      <li key={country.id} className="hover:bg-base-300 rounded px-2 py-1">
        <Link href={`/countries/${encodeURIComponent(country.Country)}`}>
          {country.CountryUa}
        </Link>
      </li>
    ));
  };

  return (
    <nav className="sticky top-0 z-50 bg-base-100 shadow-sm">
      <ul className="menu menu-horizontal">{renderCountries()}</ul>
    </nav>
  );
};
