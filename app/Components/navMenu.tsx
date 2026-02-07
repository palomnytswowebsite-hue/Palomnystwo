"use client";

import Link from "next/link";

const TYPES = [
  { slug: "pilgrimage", name: "Паломництва" },
  { slug: "excursion", name: "Екскурсії" },
  { slug: "adventure", name: "Пригоди" },
  { slug: "sea", name: "Море" },
];

const COUNTRIES = [
  { name: "Угорщина", slug: "hungary" },
  { name: "Італія", slug: "italy" },
  { name: "Ізраїль", slug: "israel" },
  { name: "Франція", slug: "france" },
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
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      {/* Ліва частина навігації */}
      <div className="navbar-start">
        {/* Мобільний дропдаун */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-1"
          >
            {/* Список типів турів */}
            {TYPES.map((t) => (
              <li key={t.slug}>
                <button
                  onClick={() =>
                    setType(selectedType === t.slug ? undefined : t.slug)
                  }
                  className={`px-3 py-2 rounded ${
                    selectedType === t.slug ? "bg-base-200 font-bold" : ""
                  }`}
                >
                  {t.name}
                </button>
              </li>
            ))}

            {/* Список країн */}
            <li className="mt-2">
              <select
                className="select select-bordered w-full"
                value={selectedCountry || ""}
                onChange={(e) => setCountry(e.target.value || undefined)}
              >
                <option value="">Всі країни</option>
                {COUNTRIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </li>

            {/* Скидання фільтрів */}
            {(selectedType || selectedCountry) && (
              <li className="mt-2">
                <button
                  onClick={() => {
                    setType(undefined);
                    setCountry(undefined);
                  }}
                  className="px-3 py-2 rounded bg-red-200 hover:bg-red-300 font-semibold w-full"
                >
                  Скасувати фільтри
                </button>
              </li>
            )}
          </ul>
        </div>

        <a className="btn btn-ghost text-xl ml-2">daisyUI</a>
      </div>

      {/* Центральна частина навігації для десктопу */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 items-center gap-2">
          <li>
            {" "}
            <Link href="/">Головна</Link>{" "}
          </li>
          {/* Типи турів — завжди видно */}
          {TYPES.map((t) => (
            <li key={t.slug}>
              <button
                onClick={() =>
                  setType(selectedType === t.slug ? undefined : t.slug)
                }
                className={`px-3 py-2 rounded ${
                  selectedType === t.slug ? "bg-base-200 font-bold" : ""
                }`}
              >
                {t.name}
              </button>
            </li>
          ))}

          {/* Список країн */}
          <li>
            <select
              className="select select-bordered ml-2"
              value={selectedCountry || ""}
              onChange={(e) => setCountry(e.target.value || undefined)}
            >
              <option value="">Всі країни</option>
              {COUNTRIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </li>

          {/* Скидання фільтрів */}
          {(selectedType || selectedCountry) && (
            <li>
              <button
                onClick={() => {
                  setType(undefined);
                  setCountry(undefined);
                }}
                className="px-3 py-2 rounded bg-red-200 hover:bg-red-300 font-semibold"
              >
                Скасувати фільтри
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Права частина навігації */}
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
  );
};
