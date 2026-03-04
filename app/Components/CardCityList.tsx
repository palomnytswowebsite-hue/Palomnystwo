"use client";

import { motion, AnimatePresence } from "framer-motion";
import { City } from "../Components/HomeClient";
import { CardCity } from "./cardCity";

interface Props {
  cities: City[];
  loading: boolean;
}

export const CardCityList = ({ cities, loading }: Props) => {
  if (loading) return <p className="text-center mt-10">Завантаження...</p>;

  // ✅ сортування вже зроблено у HomeClient
  const sortedCities = cities;

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
