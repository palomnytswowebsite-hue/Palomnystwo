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
  { slug: "hungary", label: "Угорщина" },
  { slug: "france", label: "Франція" },
  { slug: "israel", label: "Ізраїль" },
  { slug: "georgia", label: "Грузія" },
  { slug: "greece", label: "Греція" },
];

interface Props {
  selectedType?: string;
  selectedCountry?: string;
  setType: (v?: string) => void;
  setCountry: (v?: string) => void;
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
        {/* Логотип або заголовок */}
        <div className="text-xl font-bold">
          {" "}
          <Link href="/">AVE MARIA</Link>
        </div>

        {/* Гамбургер кнопка для мобільних */}
        <button
          className="md:hidden px-3 py-2 border rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Навігація для десктопу */}
        <div className="hidden md:flex gap-4 items-center">
          {TYPES.map((t) => (
            <button
              key={t.slug}
              onClick={() =>
                setType(selectedType === t.slug ? undefined : t.slug)
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

          <select
            value={selectedCountry || ""}
            onChange={(e) => setCountry(e.target.value || undefined)}
            className="px-4 py-2 rounded border bg-white"
          >
            <option value="">Всі країни</option>
            {COUNTRIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>

          {(selectedType || selectedCountry) && (
            <button
              onClick={() => {
                setType(undefined);
                setCountry(undefined);
              }}
              className="px-4 py-2 rounded bg-red-200 hover:bg-red-300"
            >
              Скинути
            </button>
          )}
        </div>
      </div>

      {/* Drawer для мобільних */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-30 z-40">
          <div className="fixed top-0 left-0 w-64 h-full bg-[#E6D8C3] p-4 shadow-lg z-50 flex flex-col gap-4">
            <h2 className="text-lg font-bold mb-2">Фільтри</h2>

            {/* TYPES */}
            <div className="flex flex-col gap-2">
              {TYPES.map((t) => (
                <button
                  key={t.slug}
                  onClick={() => {
                    setType(selectedType === t.slug ? undefined : t.slug);
                    setIsOpen(false); // закриваємо Drawer після вибору
                  }}
                  className={`px-4 py-2 rounded-full border transition text-left
                    ${
                      selectedType === t.slug
                        ? "bg-[#5D866C] text-white"
                        : "bg-white hover:bg-gray-100"
                    }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* COUNTRIES */}
            <select
              value={selectedCountry || ""}
              onChange={(e) => {
                setCountry(e.target.value || undefined);
                setIsOpen(false); // закриваємо Drawer після вибору
              }}
              className="px-4 py-2 rounded border bg-white"
            >
              <option value="">Всі країни</option>
              {COUNTRIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>

            {/* RESET */}
            {(selectedType || selectedCountry) && (
              <button
                onClick={() => {
                  setType(undefined);
                  setCountry(undefined);
                  setIsOpen(false);
                }}
                className="px-4 py-2 rounded bg-red-200 hover:bg-red-300"
              >
                Скинути
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
