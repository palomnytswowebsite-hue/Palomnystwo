"use client";

import { motion, AnimatePresence } from "framer-motion";
import { City } from "../Components/HomeClient";
import { CardCity } from "./cardCity";

interface Props {
  cities: City[];
  loading: boolean;
}

const parseDate = (d: string) => {
  if (!d) return null;
  const [day, month, year] = d.split(".");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return isNaN(date.getTime()) ? null : date;
};

export const CardCityList = ({ cities, loading }: Props) => {
  if (loading) return <p className="text-center mt-10">Завантаження...</p>;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const sortedCities = [...cities].sort((a, b) => {
    const dateA = parseDate(a.DateOfBeggining) ?? new Date(9999, 0, 1);
    const dateB = parseDate(b.DateOfBeggining) ?? new Date(9999, 0, 1);

    const diffA =
      dateA.getFullYear() * 12 +
      dateA.getMonth() -
      (currentYear * 12 + currentMonth);
    const diffB =
      dateB.getFullYear() * 12 +
      dateB.getMonth() -
      (currentYear * 12 + currentMonth);

    return diffA - diffB;
  });

  return (
    <motion.div
      layout
      className="flex flex-wrap justify-center gap-10 mt-6 mb-6"
    >
      <AnimatePresence>
        {sortedCities.map((city) => (
          <motion.div
            key={city.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <CardCity city={city} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
