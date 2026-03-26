"use client";

import { useState } from "react";
import Link from "next/link";

const COUNTRIES = [
  { slug: "medjugorje", label: "Меджугор’є" },
  { slug: "romania", label: "Румунія" },
  { slug: "albania", label: "Албанія" },
  { slug: "croatia", label: "Хорватії" },
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

  // ✅ вибір типу (море / термали / паломництво)
  const updateType = (type?: string) => {
    setType?.(type);
    setCountry?.(undefined); // завжди скидаємо країну
  };

  // ✅ вибір країни → автоматично паломництво
  const updateCountry = (country?: string) => {
    setType?.("pilgrimage");
    setCountry?.(country);
  };

  // ✅ ГОЛОВНЕ: скидання всіх фільтрів
  const resetFilters = () => {
    setType?.(undefined);
    setCountry?.(undefined);
  };

  return (
    <nav className="sticky top-0 z-50 text-2xl text-blue-950 bg-[#E6D8C3] border-b">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-center">
        {/* MOBILE BUTTON */}
        <button
          className="md:hidden px-3 py-2 border rounded"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>

        {/* DESKTOP */}
        <div className="hidden md:flex gap-4 oswald  items-center ">
          <Link href="/" className=" btn-ghost">
            Головна
          </Link>
          {/* 🔥 Паломництва */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className=" btn-ghost">
              Паломництва
            </div>

            <ul
              tabIndex={0}
              className="dropdown-content menu text-base bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {/* 🔥 Всі країни */}
              <li>
                <button onClick={resetFilters}>Всі країни</button>
              </li>

              <div className="divider my-1"></div>

              {COUNTRIES.map((c) => (
                <li key={c.slug}>
                  <button onClick={() => updateCountry(c.slug)}>
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Море */}
          <button
            onClick={() =>
              updateType(selectedType === "sea" ? undefined : "sea")
            }
            className=" btn-ghost"
          >
            Море
          </button>
          {/* Термали */}
          <button
            onClick={() =>
              updateType(selectedType === "thermals" ? undefined : "thermals")
            }
            className=" btn-ghost"
          >
            Термали
          </button>
          {/* Інші сторінки */}
          <Link href="/gallery" className=" btn-ghost">
            Галерея
          </Link>
          {/* Цікаві місця dropdown */}{" "}
          <div className="dropdown">
            {" "}
            <div tabIndex={0} role="button" className=" btn-ghost">
              {" "}
              Цікаве{" "}
            </div>{" "}
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              {" "}
              {/* Список цікавих місць */}{" "}
              <li>
                {" "}
                <Link href="/interesting">Цікаві місця</Link>{" "}
              </li>{" "}
              {/* Додаткові підсторінки, якщо будуть */}{" "}
              <li>
                {" "}
                <Link href="/interestingThoughts">Думки</Link>{" "}
              </li>{" "}
            </ul>{" "}
          </div>
          <Link href="/contactUs" className=" btn-ghost">
            Контакти
          </Link>
          <Link href="/aboutUs" className=" btn-ghost">
            Про нас
          </Link>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-lg
        transform transition-transform md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 space-y-4">
          <button
            className="mb-4 text-right w-full"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <button onClick={resetFilters}>Всі тури</button>

          <button onClick={() => updateType("sea")}>Море</button>
          <button onClick={() => updateType("thermals")}>Термали</button>

          <div className="divider"></div>

          {COUNTRIES.map((c) => (
            <button key={c.slug} onClick={() => updateCountry(c.slug)}>
              {c.label}
            </button>
          ))}

          <div className="divider"></div>

          <Link href="/gallery">Галерея</Link>
          <Link href="/contactUs">Контакти</Link>
          <Link href="/aboutUs">Про нас</Link>
        </div>
      </div>
    </nav>
  );
};
