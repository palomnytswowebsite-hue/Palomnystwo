"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { motion } from "framer-motion";
import NavLinks from "@/app/Components/navLinks";
import { NavMenu } from "@/app/Components/navMenu";
import { TourTable } from "@/app/Components/TourTable";
import { Footer } from "@/app/Components/footer";

/* ================= TYPES ================= */

interface City {
  id: string;
  Name?: string;
  slug?: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  img5?: string;
  Confession?: string[];
  description?: string;
  DateOfBeggining?: string;
  DateOfEnd?: string;
  Duration?: string;
  Route?: string;
  TourPrice?: string;
  INCLUDES?: string[];
  NOTINCLUDE?: string[];
  Country?: string[];
  ImportantInfo?: string;
  typeUa?: string[];
  [key: string]: any;
}

/* ================= HELPERS ================= */

const hasText = (value?: string | null) =>
  typeof value === "string" && value.trim() !== "";

const hasArray = (value?: unknown) => Array.isArray(value) && value.length > 0;

/* ================= ANIMATION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

/* ================= PAGE ================= */

export default function CityPage() {
  const params = useParams();
  const rawSlug = params.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  /* ===== Firestore Query ===== */

  useEffect(() => {
    const fetchCity = async () => {
      if (!slug) return;

      try {
        const q = query(collection(db, "1City"), where("slug", "==", slug));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          setCity({
            id: snapshot.docs[0].id,
            ...snapshot.docs[0].data(),
          } as City);
        } else {
          setCity(null);
        }
      } catch (error) {
        console.error(error);
        setCity(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Завантаження...</p>;

  if (!city) return <p className="text-center mt-10">Тур не знайдено</p>;

  /* ===== Images ===== */

  const images = [city.img1, city.img2, city.img3, city.img4, city.img5].filter(
    hasText,
  );

  /* ===== Days dynamic ===== */

  const days = Object.entries(city)
    .filter(([key, value]) => key.startsWith("Day") && hasText(value))
    .sort(
      ([a], [b]) =>
        parseInt(a.replace("Day", "")) - parseInt(b.replace("Day", "")),
    );

  return (
    <div>
      <NavLinks />
      {/* Якщо NavMenu має обов'язкові props — зроби їх optional в самому NavMenu */}
      <NavMenu />

      <div className="max-w-4xl mx-auto p-6 space-y-10">
        {/* TITLE */}
        {hasText(city.Name) && (
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-[#5D866C]"
          >
            {city.Name}
          </motion.h1>
        )}

        <div className="flex flex-col lg:flex-row gap-6 max-w-4xl mx-auto px-4">
          <div className="carousel carousel-vertical rounded-box w-full h-64 sm:h-80 lg:h-[500px] lg:w-2/5">
            {images.slice(0, 3).map((img, i) => (
              <div key={i} className="carousel-item h-full">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className=" flex flex-col gap-2.5 max-w-96 mx-auto">
            {/* DATES */}
            {hasText(city.DateOfBeggining) && hasText(city.DateOfEnd) && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
              >
                <strong>Дати:</strong> {city.DateOfBeggining} – {city.DateOfEnd}
              </motion.div>
            )}
            {/* DURATION */}
            {hasText(city.Duration) && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
              >
                <strong>Тривалість:</strong> {city.Duration}
              </motion.div>
            )}
            {/* TYPE */}
            {hasArray(city.typeUa) && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
              >
                <strong>Тип туру:</strong>
                <ul className="list-disc list-inside mt-2">
                  {city.typeUa!.map((type, i) => (
                    <li key={i}>{type}</li>
                  ))}
                </ul>
              </motion.div>
            )}
            {/* CONFESSION */}
            {hasArray(city.Confession) && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
              >
                <strong>Тип конфесії:</strong>
                <ul>
                  {city.Confession!.map((type, i) => (
                    <li key={i}>{type}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* ROUTE */}
            {hasText(city.Route) && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
              >
                <strong>Маршрут:</strong> {city.Route}
              </motion.div>
            )}

            {/* PRICE */}
            {hasText(city.TourPrice) && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
              >
                <strong>Ціна:</strong> {city.TourPrice}
              </motion.div>
            )}

            {/* COUNTRY */}
            {hasArray(city.Country) && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
              >
                <h2 className="font-bold mb-2">Країни туру:</h2>
                <ul className="list-disc list-inside">
                  {city.Country!.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
        <TourTable citySlug={city.slug!} />
        {/* INCLUDES */}
        {hasArray(city.INCLUDES) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
          >
            <h2 className="font-bold mb-2">Що включено:</h2>
            <ul className="list-disc list-inside">
              {city.INCLUDES!.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* NOT INCLUDE */}
        {hasArray(city.NOTINCLUDE) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
          >
            <h2 className="font-bold mb-2">Не включено:</h2>
            <ul className="list-disc list-inside">
              {city.NOTINCLUDE!.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* DESCRIPTION */}
        {hasText(city.description) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
          >
            {city.description}
          </motion.div>
        )}

        {/* DAYS */}
        {days.length > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-bold mb-4">Маршрут по днях:</h2>

            <div className="space-y-4">
              {days.map(([key, value]) => (
                <div
                  key={key}
                  className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
                >
                  <h3 className="font-semibold mb-2">
                    День {key.replace("Day", "")}
                  </h3>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* IMPORTANT INFO */}
        {hasText(city.ImportantInfo) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-4 bg-warning/10 rounded"
          >
            <h2 className="font-bold mb-2">Важлива інформація</h2>
            <p>{city.ImportantInfo}</p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
