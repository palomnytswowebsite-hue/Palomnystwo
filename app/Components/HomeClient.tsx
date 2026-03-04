"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import ParalaxHeroSection from "../Components/paralaxHeroSection";

/* ================= TYPES ================= */

export interface City {
  id: string;
  Name: string;
  slug: string;
  img1?: string;

  Country: string[];
  CountrySlug: string[];

  type: string[];
  typeUa: string[];

  chatInfo: string[]; // ✅ виправлено

  DateOfBeggining?: string;
  DateOfEnd?: string;

  tableRows?: { date?: string }[];

  allDates?: { label: string; value: number }[];
  nearestDate?: string;
  nearestDateValue?: number;
}

/* ================= DATE HELPERS ================= */

const parseSingleDate = (value?: string): Date | null => {
  if (!value) return null;

  const [day, month, year] = value.split(".");
  if (!day || !month || !year) return null;

  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return isNaN(date.getTime()) ? null : date;
};

const parseRangeDate = (value?: string): Date | null => {
  if (!value) return null;

  if (!value.includes("-")) return parseSingleDate(value);

  const [startPart] = value.split("-").map((v) => v.trim());
  return parseSingleDate(startPart);
};

/* ================= COMPONENT ================= */

export default function HomeClient() {
  const [allCities, setAllCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);

      try {
        const snapshot = await getDocs(collection(db, "Cities"));
        const now = new Date();

        const cities: City[] = snapshot.docs.map((doc) => {
          const raw = doc.data();

          const allDates: { label: string; value: number }[] = [];

          // 🔹 Основна дата
          if (raw.DateOfBeggining && raw.DateOfEnd) {
            const startDate = parseSingleDate(raw.DateOfBeggining);
            if (startDate) {
              allDates.push({
                label: `${raw.DateOfBeggining} - ${raw.DateOfEnd}`,
                value: startDate.getTime(),
              });
            }
          }

          // 🔹 Дати з таблиці
          if (Array.isArray(raw.tableRows)) {
            raw.tableRows.forEach((row: { date?: string }) => {
              const date = parseRangeDate(row.date);
              if (date) {
                allDates.push({
                  label: row.date || "",
                  value: date.getTime(),
                });
              }
            });
          }

          // 🔹 Знаходимо найближчу дату
          const futureDates = allDates.filter((d) => d.value >= now.getTime());

          const nearest = futureDates.sort((a, b) => a.value - b.value)[0];

          return {
            id: doc.id,
            Name: raw.Name ?? "",
            slug: raw.slug ?? "",
            img1: raw.img1 ?? "",

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

            type: Array.isArray(raw.type)
              ? raw.type
              : raw.type
                ? [raw.type]
                : [],

            typeUa: Array.isArray(raw.typeUa)
              ? raw.typeUa
              : raw.typeUa
                ? [raw.typeUa]
                : [],

            chatInfo: Array.isArray(raw.chatInfo)
              ? raw.chatInfo
              : raw.chatInfo
                ? [raw.chatInfo]
                : [],

            DateOfBeggining: raw.DateOfBeggining,
            DateOfEnd: raw.DateOfEnd,
            tableRows: raw.tableRows ?? [],

            allDates,
            nearestDate: nearest?.label,
            nearestDateValue: nearest?.value,
          };
        });

        setAllCities(cities);
      } catch (error) {
        console.error("Помилка завантаження міст:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  /* ================= FILTER ================= */

  const visibleCities = useMemo(() => {
    return allCities
      .filter((city) => {
        const typeOk = selectedType ? city.type.includes(selectedType) : true;

        const countryOk =
          !selectedCountry ||
          city.CountrySlug.includes(selectedCountry) ||
          city.Country.some((c) =>
            c.toLowerCase().includes(selectedCountry.toLowerCase()),
          );

        return typeOk && countryOk;
      })
      .sort(
        (a, b) =>
          (a.nearestDateValue ?? Number.MAX_SAFE_INTEGER) -
          (b.nearestDateValue ?? Number.MAX_SAFE_INTEGER),
      );
  }, [allCities, selectedType, selectedCountry]);

  /* ================= URL FILTER ================= */

  const updateFilter = (key: "type" | "country", value?: string) => {
    const params = new URLSearchParams(window.location.search);

    if (value) params.set(key, value);
    else params.delete(key);

    window.history.replaceState({}, "", `?${params.toString()}`);

    if (key === "type") setSelectedType(value);
    if (key === "country") setSelectedCountry(value);
  };

  /* ================= RENDER ================= */

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
