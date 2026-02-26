"use client";

import { useState } from "react";
import Link from "next/link";

const TYPES = [
  { slug: "pilgrimage", label: "Паломництва" },
  { slug: "thermals", label: "Термали" },
];

const COUNTRIES = [
  { slug: "italy", label: "Італія" },
  { slug: "turkey", label: "Туреччина" },
  { slug: "france", label: "Франція" },
  { slug: "israel", label: "Ізраїль" },
  { slug: "georgia", label: "Грузія" },
  { slug: "greece", label: "Греція" },
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
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>

        {/* Desktop */}
        <div className="hidden md:flex gap-4 items-center">
          {/* Сторінки */}
          <Link href="/" className="px-4 py-2 hover:text-[#ffffff] transition">
            Головна
          </Link>

          <Link
            href="/about"
            className="px-4 py-2 hover:text-[#ffffff] transition"
          >
            Про нас
          </Link>

          <Link
            href="/reviews"
            className="px-4 py-2 hover:text-[#ffffff] transition"
          >
            Відгуки
          </Link>

          <Link
            href="/contacts"
            className="px-4 py-2 hover:text-[#ffffff] transition"
          >
            Контакти
          </Link>

          {/* Фільтр типів */}
          {TYPES.filter(
            (t) => t.slug !== "adventure" && t.slug !== "excursion",
          ).map((t) => (
            <button
              key={t.slug}
              onClick={() =>
                setType?.(selectedType === t.slug ? undefined : t.slug)
              }
              className={` transition
                ${
                  selectedType === t.slug
                    ? " text-white"
                    : " hover:text-shadow-amber-300"
                }`}
            >
              {t.label}
            </button>
          ))}

          {/* Вибір країни */}
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

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-lg
          transform transition-transform duration-300 ease-in-out md:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 space-y-4">
          <button
            className="mb-4 text-right w-full"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 rounded bg-gray-50"
          >
            Головна
          </Link>

          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 rounded bg-gray-50"
          >
            Про нас
          </Link>

          <Link
            href="/reviews"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 rounded bg-gray-50"
          >
            Відгуки
          </Link>

          <Link
            href="/contacts"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 rounded bg-gray-50"
          >
            Контакти
          </Link>

          {TYPES.map((t) => (
            <button
              key={t.slug}
              onClick={() => {
                setType?.(selectedType === t.slug ? undefined : t.slug);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 rounded border bg-gray-50"
            >
              {t.label}
            </button>
          ))}

          <select
            value={selectedCountry || ""}
            onChange={(e) => {
              setCountry?.(e.target.value || undefined);
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 rounded border"
          >
            <option value="">Всі країни</option>
            {COUNTRIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};
