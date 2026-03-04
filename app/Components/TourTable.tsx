"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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
  cityId: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function TourTable({ cityId }: Props) {
  const [rows, setRows] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cityId) return;

    const fetchTable = async () => {
      try {
        console.log("City ID:", cityId);

        const tableRef = collection(db, "1City", cityId, "TableRow");
        const snapshot = await getDocs(tableRef);

        console.log("TableRow snapshot:", snapshot.docs);

        const data: TableRow[] = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            date: d.date ?? "—",
            adultPrice: d.adultPrice ?? "—",
            child5Price: d.child5Price ?? "—",
            child10Price: d.child10Price ?? "—",
          };
        });

        setRows(data);
      } catch (error) {
        console.error("Помилка отримання TableRow:", error);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTable();
  }, [cityId]);

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
