"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export const NavMenu = () => {
  const [cityNames, setCityNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Функція завантаження даних з Firestore
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const snapshot = await getDocs(collection(db, "1City"));
        const names: string[] = snapshot.docs.map((doc) => doc.data().Name);
        setCityNames(names);
      } catch (err) {
        console.error("Firestore error:", err);
        setError("Не вдалося завантажити дані з бази");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  // Функція рендеру списку імен
  const renderCityNames = () => {
    if (loading) return <li>Завантаження даних...</li>;
    if (error) return <li style={{ color: "red" }}>{error}</li>;

    return cityNames.map((name, idx) => (
      <li key={idx} className="hover:bg-base-300 rounded px-2 py-1">
        {name}
      </li>
    ));
  };

  return (
    <nav className="sticky top-0 z-50">
      <div className="drawer">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2 font-bold">Navbar Title</div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">{renderCityNames()}</ul>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {renderCityNames()}
          </ul>
        </div>
      </div>
    </nav>
  );
};
