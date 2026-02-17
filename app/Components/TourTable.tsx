"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { motion } from "framer-motion";

interface TableRow {
  id: string;
  date: string;
  adultPrice: string;
  child5Price: string;
  child10Price: string;
}

interface Props {
  citySlug: string; // тепер передаємо slug
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function TourTable({ citySlug }: Props) {
  const [rows, setRows] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!citySlug) return;

    const fetchData = async () => {
      try {
        // 1️⃣ Знаходимо документ за slug
        const cityQuery = query(
          collection(db, "1City"),
          where("slug", "==", citySlug),
        );
        const citySnapshot = await getDocs(cityQuery);

        if (citySnapshot.empty) {
          setRows([]);
          setLoading(false);
          return;
        }

        const cityDocId = citySnapshot.docs[0].id;

        // 2️⃣ Тягнемо TableRow для цього documentId
        const tableRef = collection(db, "1City", cityDocId, "TableRow");
        const tableSnapshot = await getDocs(tableRef);

        const data: TableRow[] = tableSnapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            date: (d.date as string) ?? "—",
            adultPrice: (d.adultPrice as string) ?? "—",
            child5Price: (d.child5Price as string) ?? "—",
            child10Price: (d.child10Price as string) ?? "—",
          };
        });

        setRows(data);
      } catch (error) {
        console.error("Помилка при отриманні таблиці:", error);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [citySlug]);

  if (loading)
    return <p className="text-center mt-6">Завантаження таблиці...</p>;

  if (!rows.length) return null;

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto mt-16 px-4"
    >
      <h2 className="text-3xl font-bold text-center mb-8">
        Дати та вартість туру
      </h2>

      <div className="overflow-x-auto rounded-box border bg-base-100">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>Дата</th>
              <th>Вартість</th>
              <th>Діти до 5 р.</th>
              <th>Діти до 10 р.</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hover">
                <td>{row.date}</td>
                <td>{row.adultPrice}</td>
                <td>{row.child5Price}</td>
                <td>{row.child10Price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
