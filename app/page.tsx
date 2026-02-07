"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

import ParalaxHeroSection from "./Components/paralaxHeroSection";
import NavLinks from "./Components/navLinks";

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

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams(); // ← тут просто на верхньому рівні

  const [allCities, setAllCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const selectedType = searchParams.get("type") || undefined;
  const selectedCountry = searchParams.get("country") || undefined;

  /* ========== FETCH DATA ========== */
  useState(() => {
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
          type: Array.isArray(raw.type) ? raw.type : raw.type ? [raw.type] : [],
          typeUa: Array.isArray(raw.typeUa)
            ? raw.typeUa
            : raw.typeUa
              ? [raw.typeUa]
              : [],
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
        };
      });

      setAllCities(data);
      setLoading(false);
    };

    fetchCities();
  });

  /* ========== FILTER + SORT по даті ========== */
  const visibleCities = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const parseDate = (d: string) => {
      const [day, month, year] = d.split(".");
      return new Date(Number(year), Number(month) - 1, Number(day));
    };

    return allCities
      .filter((city) =>
        selectedType ? city.type.includes(selectedType) : true,
      )
      .filter((city) =>
        selectedCountry ? city.CountrySlug.includes(selectedCountry) : true,
      )
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
      });
  }, [allCities, selectedType, selectedCountry]);

  /* ========== URL HELPERS ========== */
  const updateFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <NavLinks />
      <ParalaxHeroSection
        cities={visibleCities}
        loading={loading}
        selectedType={selectedType}
        selectedCountry={selectedCountry}
        setType={(v) => updateFilter("type", v)}
        setCountry={(v) => updateFilter("country", v)}
      />
    </>
  );
}
