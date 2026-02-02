// components/FirestoreDataDisplay.tsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
// Переконайтеся, що шлях до firebase/config.ts є правильним
// З цієї директорії (app/Components) потрібно піднятися дві директорії до root/firebase
import { db } from "../firebase/config"; // <<< Тільки db

// Інтерфейс для сирих даних, що приходять з Firestore
interface RawTripData {
  Name?: string;
}

// Інтерфейс для елементів меню, які ми будемо відображати
interface MenuItem {
  id: string;
  Name?: string; // Firestore 'Name' (optional)
  title: string; // Derived friendly title
  path: string; // Route path
}

const FirestoreDataDisplay: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const COLLECTION_NAME = "menu"; // Ваша колекція називається 'menu'

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const tripsCollectionRef = collection(db, COLLECTION_NAME);
        const querySnapshot = await getDocs(tripsCollectionRef);

        const fetchedMenuItems: MenuItem[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as RawTripData;

          // Витягуємо 'Name' — якщо відсутнє, підставляємо ID документа
          const title = data.Name || `Документ ${doc.id}`;

          // Генеруємо приклад шляху. Вам потрібно буде адаптувати це під вашу логіку роутингу.
          const path = `/menu/${doc.id}`;

          return {
            id: doc.id,
            Name: title,
            title: title,
            path,
          };
        });
        setMenuItems(fetchedMenuItems);
      } catch (err) {
        console.error("Помилка під час завантаження даних Firestore:", err);
        setError(
          "Не вдалося завантажити дані. Перевірте консоль браузера для деталей. Можливо, проблеми з дозволами або мережею.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData(); // Тепер викликаємо одразу, не чекаючи аутентифікації
  }, []); // Пустий масив залежностей означає, що ефект буде виконано лише один раз при монтуванні компонента

  if (loading) {
    return <p>Завантаження елементів меню...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Помилка: {error}</p>;
  }

  return (
    <ul className="flex justify-center gap-8 bg-cyan-700 p-5 ">
      {menuItems.length === 0 ? (
        <p className="text-amber-50">
          Немає елементів меню для відображення у колекції '{COLLECTION_NAME}'.
        </p>
      ) : (
        menuItems.map((menuItem) => (
          <li key={menuItem.id}>
            <a
              className="relative text-xl text-amber-50 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-amber-50 after:transition-all after:duration-300 hover:after:w-full "
              href={menuItem.path}
            >
              {menuItem.title}
            </a>
          </li>
        ))
      )}
    </ul>
  );
};

export default FirestoreDataDisplay;
