"use client";

import { useState } from "react";
import Link from "next/link";

const TYPES = [
  { slug: "pilgrimage", label: "Паломництва" },
  { slug: "thermals", label: "Термали" },
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
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center">
        {/* MOBILE BUTTON */}
        <button
          className="md:hidden px-3 py-2 border rounded"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-4 items-center">
          <Link href="/" className="btn btn-ghost">
            Головна
          </Link>

          {/* Паломництва dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              Паломництва
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {/* Скасувати вибір */}
              <li>
                <button
                  onClick={() => {
                    setType?.("pilgrimage");
                    setCountry?.(undefined);
                  }}
                >
                  Всі країни
                </button>
              </li>

              <div className="divider my-1"></div>

              {/* Країни */}
              {COUNTRIES.map((c) => (
                <li key={c.slug}>
                  <button
                    onClick={() => {
                      setType?.("pilgrimage");
                      setCountry?.(c.slug);
                    }}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Море */}
          <button
            onClick={() =>
              setType?.(selectedType === "sea" ? undefined : "sea")
            }
            className="btn btn-ghost"
          >
            Море
          </button>

          {/* Термали */}
          <button
            onClick={() =>
              setType?.(selectedType === "thermals" ? undefined : "thermals")
            }
            className="btn btn-ghost"
          >
            Термали
          </button>

          {/* Цікаве dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              Цікаве
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link href="/interesting/thoughts">Думки</Link>
              </li>

              <li>
                <Link href="/interesting/about">Про...</Link>
              </li>
            </ul>
          </div>

          <Link href="/gallery" className="btn btn-ghost">
            Галерея
          </Link>

          <Link href="/contactUs" className="btn btn-ghost">
            Контакти
          </Link>

          <Link href="/aboutUs" className="btn btn-ghost">
            Про нас
          </Link>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden
        ${isOpen ? "block" : "hidden"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-lg
        transform transition-transform md:hidden
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 space-y-4">
          <button
            className="mb-4 text-right w-full"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <Link href="/" className="block">
            Головна
          </Link>
          <Link href="/gallery" className="block">
            Галерея
          </Link>
          <Link href="/contactUs" className="block">
            Контакти
          </Link>
          <Link href="/aboutUs" className="block">
            Про нас
          </Link>
        </div>
      </div>
    </nav>
  );
};
