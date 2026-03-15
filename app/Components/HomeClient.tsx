"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, doc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import ParalaxHeroSection from "../Components/paralaxHeroSection";

/* ================= TYPES ================= */

export interface UpcomingTours {
  dates?: string;
  albutPrice?: string;
  kidsBefore10?: string;
  kidsBefore5?: string;
}

export interface City {
  id: string;
  Name: string;
  slug: string;
  img1?: string;
  Country: string[];
  CountrySlug: string[];
  type: string[];
  typeUa: string[];
  chatInfo?: string;

  DateOfBeggining?: Timestamp;
  DateOfEnd?: Timestamp;

  upcomingTour?: UpcomingTours[];

  allDates?: { label: string; value: number }[];
  nearestDate?: string;
  nearestDateValue?: number;
}

/* ================= HELPERS ================= */

const parseDateString = (dateStr: string): number | null => {
  if (!dateStr) return null;

  const rangeMatch = dateStr.match(
    /(\d{2})\.(\d{2}) – (\d{2})\.(\d{2})\.(\d{4})/,
  );
  const singleMatch = dateStr.match(/(\d{2})\.(\d{2})\.(\d{4})/);

  if (rangeMatch) {
    const [_, day, month, endDay, endMonth, year] = rangeMatch;
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  } else if (singleMatch) {
    const [_, day, month, year] = singleMatch;
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
  }

  return null;
};

const formatDate = (timestamp: number) => {
  const d = new Date(timestamp);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

/* ================= FETCH ALL CITIES ================= */

async function fetchAllCities(): Promise<City[]> {
  const citiesCollection = collection(db, "Cities");
  const cityDocsSnap = await getDocs(citiesCollection);

  const now = Date.now();

  const cities: City[] = await Promise.all(
    cityDocsSnap.docs.map(async (docSnap) => {
      const cityId = docSnap.id;
      const data = docSnap.data() ?? {};

      // Підколекція TableRow
      const upcomingTourSnap = await getDocs(
        collection(doc(db, "Cities", cityId), "UpcomingTours"),
      );
      const upcomingTours: UpcomingTours[] = upcomingTourSnap.docs.map(
        (rowDoc) => rowDoc.data() as UpcomingTours,
      );

      // Дати з TableRow
      const rowDates: { label: string; value: number }[] = upcomingTours
        .map((row) => {
          const ts = parseDateString(row.dates || "");
          return ts ? { label: row.dates!, value: ts } : null;
        })
        .filter(Boolean) as { label: string; value: number }[];

      // Дати з документа
      const docDates: { label: string; value: number }[] = [];
      if (data.DateOfBeggining && data.DateOfBeggining instanceof Timestamp) {
        const startTs = data.DateOfBeggining.toDate().getTime();
        if (data.DateOfEnd && data.DateOfEnd instanceof Timestamp) {
          const endTs = data.DateOfEnd.toDate().getTime();
          const label = `${formatDate(startTs)} – ${formatDate(endTs)}`;
          docDates.push({ label, value: startTs });
        } else {
          const label = formatDate(startTs);
          docDates.push({ label, value: startTs });
        }
      }

      // Об’єднуємо всі дати і сортуємо по місяцях і днях
      const allDates = [...rowDates, ...docDates].sort((a, b) => {
        const dateA = new Date(a.value);
        const dateB = new Date(b.value);
        if (dateA.getMonth() !== dateB.getMonth())
          return dateA.getMonth() - dateB.getMonth();
        return dateA.getDate() - dateB.getDate();
      });

      const nearest = allDates.find((d) => d.value >= now) || allDates[0];

      return {
        id: cityId,
        Name: data.Name || cityId,
        slug: data.slug || cityId,
        img1: data.img1 || "",
        Country: data.Country || [],
        CountrySlug: data.CountrySlug || [],
        type: data.type || [],
        typeUa: data.typeUa || [],
        chatInfo: data.chatInfo || "",
        DateOfBeggining: data.DateOfBeggining,
        DateOfEnd: data.DateOfEnd,
        upcomingTours,
        allDates,
        nearestDate: nearest?.label || "",
        nearestDateValue: nearest?.value || 0,
      };
    }),
  );

  return cities;
}

/* ================= COMPONENT ================= */

export default function HomeClient() {
  const [allCities, setAllCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const cities = await fetchAllCities();
        setAllCities(cities);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  // Сортування: міста з датами на початку, без дат вкінці
  const visibleCities = useMemo(() => {
    return allCities
      .filter((city) => {
        const typeOk = selectedType ? city.type.includes(selectedType) : true;
        const countryOk = selectedCountry
          ? city.CountrySlug.includes(selectedCountry)
          : true;
        return typeOk && countryOk;
      })
      .sort((a, b) => {
        // Міста без дат вкінці
        if (!a.allDates?.length) return 1;
        if (!b.allDates?.length) return -1;
        // Сортування по першій даті
        return (a.allDates[0].value ?? 0) - (b.allDates[0].value ?? 0);
      });
  }, [allCities, selectedType, selectedCountry]);

  const updateFilter = (key: "type" | "country", value?: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    window.history.replaceState({}, "", `?${params.toString()}`);
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
