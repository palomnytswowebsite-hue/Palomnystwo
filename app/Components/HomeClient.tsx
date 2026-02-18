"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

import ParalaxHeroSection from "../Components/paralaxHeroSection";

export interface City {
  id: string;
  Name: string;
  slug: string;
  img1?: string;
  Country: string[];
  CountrySlug: string[];
  type: string[];
  typeUa: string[];
  DateOfBeggining: string;
}

export default function HomeClient() {
  const router = useRouter();

  const [allCities, setAllCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();

  // Парсим search params на клієнті
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedType(params.get("type") || undefined);
    setSelectedCountry(params.get("country") || undefined);
  }, []);

  /* ========== FETCH DATA ========== */
  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "1City"));

      const data: City[] = snapshot.docs.map((doc) => {
        const raw = doc.data();

        return {
          id: doc.id,
          Name: raw.Name,
          slug: raw.slug,
          img1: raw.img1 ?? "",
          DateOfBeggining: raw.DateOfBeggining,

          Country: Array.isArray(raw.Country)
            ? raw.Country
            : raw.Country
              ? [raw.Country]
              : [],

          CountrySlug: Array.isArray(raw.CountrySlug)
            ? raw.CountrySlug
            : raw.CountrySlug
              ? [raw.CountrySlug]
              : [],

          type: Array.isArray(raw.type) ? raw.type : raw.type ? [raw.type] : [],

          typeUa: Array.isArray(raw.typeUa)
            ? raw.typeUa
            : raw.typeUa
              ? [raw.typeUa]
              : [],
        };
      });

      setAllCities(data);
      setLoading(false);
    };

    fetchCities();
  }, []);

  /* ========== FILTER + SORT ========== */
  const visibleCities = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const parseDate = (d: string) => {
      const [day, month, year] = d.split(".");
      return new Date(Number(year), Number(month) - 1, Number(day));
    };

    return (
      allCities
        // Фільтр по типу
        .filter((city) =>
          selectedType ? city.type.includes(selectedType) : true,
        )

        // 🔥 ФІКС ФІЛЬТРУ КРАЇНИ (нічого не видаляємо)
        .filter((city) => {
          if (!selectedCountry) return true;

          // Перевірка по CountrySlug
          if (city.CountrySlug.includes(selectedCountry)) return true;

          // Додаткова перевірка по назві країни
          if (
            city.Country.some((c) =>
              c.toLowerCase().includes(selectedCountry.toLowerCase()),
            )
          )
            return true;

          return false;
        })

        // Сортування
        .sort((a, b) => {
          const dateA = a.DateOfBeggining
            ? parseDate(a.DateOfBeggining)
            : new Date(9999, 0, 1);

          const dateB = b.DateOfBeggining
            ? parseDate(b.DateOfBeggining)
            : new Date(9999, 0, 1);

          const diffA =
            dateA.getFullYear() * 12 +
            dateA.getMonth() -
            (currentYear * 12 + currentMonth);

          const diffB =
            dateB.getFullYear() * 12 +
            dateB.getMonth() -
            (currentYear * 12 + currentMonth);

          return diffA - diffB;
        })
    );
  }, [allCities, selectedType, selectedCountry]);

  const updateFilter = (key: "type" | "country", value?: string) => {
    const params = new URLSearchParams(window.location.search);

    if (value) params.set(key, value);
    else params.delete(key);

    router.push(`?${params.toString()}`, { scroll: false });

    if (key === "type") setSelectedType(value);
    if (key === "country") setSelectedCountry(value);
  };

  return (
    <ParalaxHeroSection
      cities={visibleCities}
      loading={loading}
      selectedType={selectedType}
      selectedCountry={selectedCountry}
      setType={(v) => updateFilter("type", v)}
      setCountry={(v) => updateFilter("country", v)}
    />
  );
}
