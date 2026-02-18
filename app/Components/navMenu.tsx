"use client";

import { useState } from "react";
import Link from "next/link";

const TYPES = [
  { slug: "pilgrimage", label: "Паломництва" },
  { slug: "excursion", label: "Екскурсії" },
  { slug: "adventure", label: "Пригоди" },
  { slug: "sea", label: "Море" },
];

const COUNTRIES = [
  { slug: "italy", label: "Італія" },
  { slug: "turkey", label: "Туреччина" },
  { slug: "france", label: "Франція" },
  { slug: "israel", label: "Ізраїль" },
  { slug: "georgia", label: "Грузія" },
  { slug: "greece", label: "Греція" },
];

const POPULAR_COUNTRIES = [
  { slug: "bosnia", label: "Меджугор'є" },
  { slug: "hungary", label: "Угорщина" },
];

interface Props {
  selectedType?: string;
  selectedCountry?: string;
  setType?: (v?: string) => void;
  setCountry?: (v?: string) => void;
}

export const NavMenu = ({
  selectedType,
  selectedCountry,
  setType,
  setCountry,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#E6D8C3] border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link href="/">AVE MARIA</Link>
        </div>

        <button
          className="md:hidden px-3 py-2 border rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>

        <div className="hidden md:flex gap-4 items-center">
          {/* Типи (без Пригоди та Екскурсії) */}
          {TYPES.filter(
            (t) => t.slug !== "adventure" && t.slug !== "excursion",
          ).map((t) => (
            <button
              key={t.slug}
              onClick={() =>
                setType?.(selectedType === t.slug ? undefined : t.slug)
              }
              className={`px-4 py-2 rounded-full border transition
                ${
                  selectedType === t.slug
                    ? "bg-[#5D866C] text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
            >
              {t.label}
            </button>
          ))}

          {/* Популярні країни */}
          {POPULAR_COUNTRIES.map((c) => (
            <button
              key={c.slug}
              onClick={() =>
                setCountry?.(selectedCountry === c.slug ? undefined : c.slug)
              }
              className={`px-4 py-2 rounded-full border transition
                ${
                  selectedCountry === c.slug
                    ? "bg-[#86B0BD] text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
            >
              ⭐ {c.label}
            </button>
          ))}

          {/* Select інших країн */}
          <select
            value={selectedCountry || ""}
            onChange={(e) => setCountry?.(e.target.value || undefined)}
            className="px-4 py-2 rounded border bg-white"
          >
            <option value="">Всі країни</option>
            {COUNTRIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>

          {/* Кнопка скидання */}
          {(selectedType || selectedCountry) && (
            <button
              onClick={() => {
                setType?.(undefined);
                setCountry?.(undefined);
              }}
              className="px-4 py-2 rounded bg-red-200 hover:bg-red-300"
            >
              Скинути
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
