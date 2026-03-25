"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { motion } from "framer-motion";

interface UpcomingTour {
  id: string;
  dates: string;
  albutPrice: string;
  kidsBefore5: string;
  kidsBefore10: string;
}

interface Props {
  cityDocId: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function UpcomingTours({ cityDocId }: Props) {
  const [rows, setRows] = useState<UpcomingTour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cityDocId) return;

    const fetchTours = async () => {
      try {
        const tableRef = collection(db, "Cities", cityDocId, "UpcomingTours");
        const snapshot = await getDocs(tableRef);

        const data: UpcomingTour[] = snapshot.docs
          .map((doc) => {
            const d = doc.data();
            return {
              id: doc.id,
              dates: d.dates ?? "",
              albutPrice: d.albutPrice ?? "",
              kidsBefore5: d.kidsBefore5 ?? "",
              kidsBefore10: d.kidsBefore10 ?? "",
            };
          })
          // 🔥 прибираємо повністю пусті рядки
          .filter((row) => {
            return (
              row.dates || row.albutPrice || row.kidsBefore5 || row.kidsBefore10
            );
          });

        setRows(data);
      } catch (error) {
        console.error("Помилка отримання UpcomingTours:", error);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [cityDocId]);

  // ⏳ Показуємо loader (за бажанням)
  if (loading) {
    return <p className="text-center mt-6">Завантаження таблиці...</p>;
  }

  // ❗ ГОЛОВНЕ: якщо нема даних → нічого не показуємо взагалі
  if (!rows.length) {
    return null;
  }

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full rounded-box border p-3.5 mx-auto bg-[#86B0BD] px-4"
    >
      <h2 className="text-lg font-semibold text-white m-2.5 text-center">
        Найблищі дати туру
      </h2>

      <div className="overflow-x-auto rounded-box border bg-base-100">
        <table className="table">
          <thead className="bg-[#86B0BD] text-white text-center">
            <tr>
              <th>Дата</th>
              <th>Вартість</th>
              <th>Діти до 5 р.</th>
              <th>Діти до 10 р.</th>
            </tr>
          </thead>

          <tbody className="bg-[#FFF0DD] text-black text-center">
            {rows.map((row) => (
              <tr key={row.id} className="hover">
                <td>{row.dates}</td>
                <td>{row.albutPrice}</td>
                <td>{row.kidsBefore5}</td>
                <td>{row.kidsBefore10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
