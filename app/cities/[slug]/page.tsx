"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { motion } from "framer-motion";
import NavLinks from "@/app/Components/navLinks";
import { NavMenu } from "@/app/Components/navMenu";
import Loader from "@/app/Components/Loader";
// import { TourTable } from "@/app/Components/TourTable";
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
  chatInfo?: string;
  RouteBy?: string;
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
  tableRows?: { date?: string }[];
  allDates?: { label: string; value: number }[];
  nearestDate?: string;
  nearestDateValue?: number;
  [key: string]: any;
}

/* ================= HELPERS ================= */

const hasText = (value?: string | null) =>
  typeof value === "string" && value.trim() !== "";

const hasArray = (value?: unknown) => Array.isArray(value) && value.length > 0;

const parseSingleDate = (value?: string): Date | null => {
  if (!value) return null;
  const [day, month, year] = value.split(".");
  if (!day || !month || !year) return null;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return isNaN(date.getTime()) ? null : date;
};

const parseRangeDate = (value?: string): Date | null => {
  if (!value) return null;
  if (!value.includes("-")) return parseSingleDate(value);
  const [startPart] = value.split("-").map((v) => v.trim());
  return parseSingleDate(startPart);
};

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

  useEffect(() => {
    const fetchCity = async () => {
      if (!slug) return;

      try {
        // 🔹 Тут змінили колекцію на "Cities"
        const q = query(collection(db, "Cities"), where("slug", "==", slug));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const raw = snapshot.docs[0].data();

          // =================== Підготовка дат ===================
          const allDates: { label: string; value: number }[] = [];

          if (raw.DateOfBeggining && raw.DateOfEnd) {
            const startDate = parseSingleDate(raw.DateOfBeggining);
            if (startDate) {
              allDates.push({
                label: `${raw.DateOfBeggining} - ${raw.DateOfEnd}`,
                value: startDate.getTime(),
              });
            }
          }

          if (Array.isArray(raw.tableRows)) {
            raw.tableRows.forEach((row: { date?: string }) => {
              const date = parseRangeDate(row.date);
              if (date)
                allDates.push({ label: row.date || "", value: date.getTime() });
            });
          }

          const now = new Date();
          const futureDates = allDates.filter((d) => d.value >= now.getTime());
          const nearest = futureDates.sort((a, b) => a.value - b.value)[0];

          setCity({
            id: snapshot.docs[0].id,
            ...raw,
            allDates,
            nearestDate: nearest?.label,
            nearestDateValue: nearest?.value,
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

  if (loading)
    return (
      <div className="flex justify-center mt-10">
        <Loader />
      </div>
    );

  if (!city) return <p className="text-center mt-10">Тур не знайдено</p>;

  const images = [
    city.img1,
    city.img2,
    city.img3,
    city.img4,
    city.img5,
    city.img6,
    city.img7,
    city.img8,
    city.img9,
    city.img10,
  ].filter(hasText);

  const days = Object.entries(city)
    .filter(([key, value]) => key.startsWith("Day") && hasText(value))
    .sort(
      ([a], [b]) =>
        parseInt(a.replace("Day", "")) - parseInt(b.replace("Day", "")),
    );

  return (
    <div>
      <NavLinks />
      <NavMenu />

      <div className="max-w-4xl mx-auto p-6 space-y-10">
        {hasText(city.Name) && (
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-[#ffffff]"
          >
            {city.Name}
          </motion.h1>
        )}

        <div className="flex flex-col lg:flex-row gap-6 max-w-4xl mx-auto px-4">
          <div className="carousel carousel-vertical rounded-box w-full h-64 sm:h-80 lg:h-[500px] lg:w-sm">
            {images[0] && (
              <div className="carousel-item h-full">
                <img
                  src={images[0]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2.5 max-w-96 mx-auto">
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

            {hasArray(city.Country) && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
              >
                <strong>Країна:</strong> {city.Country!.join(", ")}
              </motion.div>
            )}
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
            {hasText(city.RouteBy) && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
              >
                <strong>Тип транспорту:</strong> {city.RouteBy}
              </motion.div>
            )}

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

            {hasArray(city.Confession) && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
              >
                <strong>Тип Конфесії:</strong>
                <ul className="list-disc list-inside mt-2">
                  {city.Confession!.map((types, i) => (
                    <li key={i}>{types}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>

        {/* <TourTable cityId={city.id} /> */}
        {hasText(city.description) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
          >
            <strong>Опис:</strong>
            <p className="mt-2 whitespace-pre-line">{city.description}</p>
          </motion.div>
        )}

        {hasText(city.chatInfo) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
          >
            <strong>Інформація для чату:</strong>
            <p className="mt-2 whitespace-pre-line">{city.chatInfo}</p>
          </motion.div>
        )}
        {/* План туру */}
        {days.length > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-bold mb-4 p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md">
              План туру:
            </h2>
            <div className="space-y-4">
              {days.map(([key, value], i) => (
                <div key={key} className="space-y-4">
                  <div className="p-4 bg-base-100 rounded shadow-md">
                    <h3 className="font-semibold mb-2">
                      День {key.replace("Day", "")}
                    </h3>
                    <p>{value}</p>
                  </div>
                  {images[i] && (
                    <img
                      src={images[i]}
                      alt={`Day ${i + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {hasArray(city.INCLUDES) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
          >
            <strong>У вартість входить:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {city.INCLUDES!.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {hasArray(city.NOTINCLUDE) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
          >
            <strong>У вартість не входить:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {city.NOTINCLUDE!.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {hasText(city.ImportantInfo) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-4 bg-base-100 rounded shadow-[#86B0BD] shadow-md"
          >
            <strong>Важлива інформація:</strong>
            <p className="mt-2 whitespace-pre-line">{city.ImportantInfo}</p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
