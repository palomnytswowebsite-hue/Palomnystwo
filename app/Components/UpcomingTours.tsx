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
  cityDocId: string; // Тепер передаємо **ID документа міста**
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
        console.log("CITY DOC ID USED:", cityDocId);

        const tableRef = collection(db, "Cities", cityDocId, "UpcomingTours");
        const snapshot = await getDocs(tableRef);

        console.log("UPCOMING TOURS DOCS:", snapshot.docs);

        const data: UpcomingTour[] = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            dates: d.dates ?? "—",
            albutPrice: d.albutPrice ?? "—",
            kidsBefore5: d.kidsBefore5 ?? "—",
            kidsBefore10: d.kidsBefore10 ?? "—",
          };
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

  if (loading)
    return <p className="text-center mt-6">Завантаження таблиці...</p>;

  if (!rows.length)
    return <p className="text-center mt-6">Немає даних турів.</p>;

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full rounded-box border p-3.5  mx-auto bg-white  px-4"
    >
      <h2 className="text-lg font-semibold m-2.5 text-center">
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
