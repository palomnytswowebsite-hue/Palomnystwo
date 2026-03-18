"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { motion } from "framer-motion";
import NavLinks from "@/app/Components/navLinks";
import { NavMenu } from "@/app/Components/navMenu";
import Loader from "@/app/Components/Loader";
import ScrollToTop from "@/app/Components/ScrollToTop";
import { Footer } from "@/app/Components/footer";
import { FAB } from "../../Components/FAB";
import { UpcomingTours } from "@/app/Components/UpcomingTours";

/* ================= HELPERS ================= */
const hasText = (value?: string | null) =>
  typeof value === "string" && value.trim() !== "";

const hasArray = (value?: unknown) => Array.isArray(value) && value.length > 0;

const parseSingleDate = (value?: string | any): Date | null => {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate();
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const parts = value.split(".");
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return isNaN(date.getTime()) ? null : date;
  }
  return null;
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const getImagesForDay = (city: any, dayIndex: number) => {
  const result: string[] = [];
  const mainImg = city[`img${dayIndex + 1}`];
  if (mainImg) result.push(mainImg);

  let i = 1;
  while (city[`img${dayIndex + 1}_${i}`]) {
    result.push(city[`img${dayIndex + 1}_${i}`]);
    i++;
  }

  return result;
};

/* ================= PAGE ================= */
export default function CityPage() {
  const params = useParams();
  const rawSlug = params.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const [city, setCity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState<[string, string][]>([]);
  const [selectedImage, setSelectedImage] = useState<{
    index: number;
    images: string[];
  } | null>(null);

  const nextImage = () => {
    if (!selectedImage) return;
    setSelectedImage({
      ...selectedImage,
      index: (selectedImage.index + 1) % selectedImage.images.length,
    });
  };

  const prevImage = () => {
    if (!selectedImage) return;
    setSelectedImage({
      ...selectedImage,
      index:
        (selectedImage.index - 1 + selectedImage.images.length) %
        selectedImage.images.length,
    });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage]);

  useEffect(() => {
    const fetchCity = async () => {
      if (!slug) return;
      try {
        const q = query(collection(db, "Cities"), where("slug", "==", slug));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const docSnap = snapshot.docs[0];
          const raw = docSnap.data();

          const allDates: { label: string; value: number }[] = [];

          const formatDate = (d: Date) =>
            `${String(d.getDate()).padStart(2, "0")}.${String(
              d.getMonth() + 1,
            ).padStart(2, "0")}.${d.getFullYear()}`;

          if (raw.DateOfBeggining && raw.DateOfEnd) {
            const startDate = parseSingleDate(raw.DateOfBeggining);
            const endDate = parseSingleDate(raw.DateOfEnd);

            if (startDate && endDate) {
              allDates.push({
                label: `${formatDate(startDate)} – ${formatDate(endDate)}`,
                value: startDate.getTime(),
              });
            }
          }

          allDates.sort((a, b) => a.value - b.value);
          const now = new Date();
          const nearest =
            allDates.find((d) => d.value >= now.getTime()) || allDates[0];

          const plan: [string, string][] = Object.keys(raw)
            .filter((key) => /^Day\d+$/.test(key))
            .sort((a, b) => {
              const numA = Number(a.replace("Day", ""));
              const numB = Number(b.replace("Day", ""));
              return numA - numB;
            })
            .map((key) => [key, raw[key]]);

          setDays(plan);

          const thermalNymphsSnap = await getDocs(
            collection(db, "Cities", docSnap.id, "thermalNymphsPrice"),
          );

          const debrecenSnap = await getDocs(
            collection(db, "Cities", docSnap.id, "thermalBathsOfDebrecenPrice"),
          );

          const mediterraneanSnap = await getDocs(
            collection(db, "Cities", docSnap.id, "mediterraneanWaterPark"),
          );

          setCity({
            id: docSnap.id,
            docId: docSnap.id,
            ...raw,
            allDates,
            nearestDate: nearest?.label,
            nearestDateValue: nearest?.value,
            thermalNymphsPrice: thermalNymphsSnap.docs.map((d) => d.data()),
            thermalBathsOfDebrecenPrice: debrecenSnap.docs.map((d) => d.data()),
            mediterraneanWaterPark: mediterraneanSnap.docs.map((d) => d.data()),
          });
        } else setCity(null);
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

  const images = getImagesForDay(city, 0);

  return (
    <div className="">
      <NavLinks />
      <NavMenu />

      {city.Name && (
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="marmelad-font bg-[#E6D8C3] m-0 p-4 text-3xl font-bold text-center text-[#5D866C]"
        >
          {city.Name}
        </motion.h1>
      )}

      {/* ================= BODY ================= */}
      <div className="max-w-4xl mx-auto p-6 space-y-10">
        {/* ТВОЯ BODY СТРУКТУРА ПОВНІСТЮ ВСТАВЛЕНА ТУТ */}
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
            {hasArray(city.allDates) && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-4 bg-base-100 rounded shadow-md"
              >
                <strong>Дати туру:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {city.allDates.map((d: any, i: number) => (
                    <li key={i}>{d.label}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {hasArray(city.Country) && (
              <motion.div className="p-4 bg-base-100 rounded shadow-md">
                <strong>Країна:</strong> {city.Country.join(", ")}
              </motion.div>
            )}

            {hasText(city.Duration) && (
              <motion.div className="p-4 bg-base-100 rounded shadow-md">
                <strong>Тривалість:</strong> {city.Duration}
              </motion.div>
            )}

            {hasText(city.Route) && (
              <motion.div className="p-4 bg-base-100 rounded shadow-md">
                <strong>Маршрут:</strong> {city.Route}
              </motion.div>
            )}

            {hasText(city.RouteBy) && (
              <motion.div className="p-4 bg-base-100 rounded shadow-md">
                <strong>Тип транспорту:</strong> {city.RouteBy}
              </motion.div>
            )}

            {hasArray(city.typeUa) && (
              <motion.div className="p-4 bg-base-100 rounded shadow-md">
                <strong>Тип туру:</strong>
                <ul className="list-disc list-inside mt-2">
                  {city.typeUa.map((type: string, i: number) => (
                    <li key={i}>{type}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {hasArray(city.Confession) && (
              <motion.div className="p-4 bg-base-100 rounded shadow-md">
                <strong>Тип Конфесії:</strong>
                <ul className="list-disc list-inside mt-2">
                  {city.Confession.map((types: string, i: number) => (
                    <li key={i}>{types}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>
        {/* ================= Опис ================= */}
        {hasText(city.description) && (
          <motion.div className="p-4 bg-base-100 rounded shadow-md">
            <strong>Опис:</strong>
            <p className="mt-2 whitespace-pre-line">{city.description}</p>
          </motion.div>
        )}
        {/* ================= Таблиця майбутніх турів ================= */}
        {city.docId && (
          <div className="max-w-4xl mx-auto p-6">
            <UpcomingTours cityDocId={city.docId} />
          </div>
        )}
        {/* ================= Chat Info ================= */}
        {hasText(city.chatInfo) && (
          <motion.div className="p-4 bg-base-100 rounded shadow-md">
            <strong>Інформація для чату:</strong>
            <p className="mt-2 whitespace-pre-line">{city.chatInfo}</p>
          </motion.div>
        )}

        {/* ================= Телефони ================= */}
        <motion.div className="p-4 bg-base-100 rounded shadow-md">
          <strong>Телефони для бронювання , запитань:</strong>
          <ul className="list-disc list-inside mt-2">
            <li>+38050 101 07 42</li>
            <li>+38096 935 52 98</li>
          </ul>
        </motion.div>

        {/* ================= Дні та галереї ================= */}
        {/* ================= Дні та галереї ================= */}
        {days.map(([key, value], i) => {
          const dayImages = getImagesForDay(city, i);
          const linkKey = `${key}Link`;
          const dayLink = city[linkKey];
          return (
            <div key={key} className="mb-6">
              <div className="p-4 bg-base-100 rounded shadow-md">
                <h3 className="font-semibold">День {key.replace("Day", "")}</h3>
                <p>{value}</p>
                {/* 🔗 Лінк для 5 дня */}
                {dayLink && (
                  <a
                    href={typeof dayLink === "string" ? dayLink : dayLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-3 text-blue-600 underline hover:text-blue-800"
                  >
                    {typeof dayLink === "string" ? "Детальніше" : dayLink.text}
                  </a>
                )}
              </div>

              <div className=" mt-2">
                {dayImages.map((img: string, index: number) => (
                  <img
                    key={index}
                    src={img}
                    onClick={() =>
                      setSelectedImage({
                        index,
                        images: dayImages,
                      })
                    }
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      margin: "0 auto",
                    }}
                    className="rounded cursor-pointer hover:scale-105 transition"
                  />
                ))}
              </div>

              {key === "Day3" && (
                <div className="space-y-4 mt-4">
                  {/* Таблиці цін */}
                  {hasArray(city.thermalNymphsPrice) && (
                    <div className="p-4 bg-[#86B0BD] rounded shadow-md overflow-x-auto">
                      <strong className="text-white">
                        Ціни Аквапарку Німфея:
                      </strong>
                      <table className="table w-full mt-4 text-center">
                        {/* ...thead і tbody... */}
                      </table>
                    </div>
                  )}

                  {hasArray(city.thermalBathsOfDebrecenPrice) && (
                    <div className="p-4 bg-[#86B0BD] rounded shadow-md overflow-x-auto">
                      <strong className="text-white">
                        Ціни на квитки у термальні купальні Дебрецену:
                      </strong>
                      <table className="table w-full mt-4 text-center">
                        {/* ...thead і tbody... */}
                      </table>
                    </div>
                  )}

                  {hasArray(city.mediterraneanWaterPark) && (
                    <div className="p-4 bg-[#86B0BD] rounded shadow-md overflow-x-auto">
                      <strong className="text-white">
                        Ціни Середземноморський Аквапарк:
                      </strong>
                      <table className="table w-full mt-4 text-center">
                        {/* ...thead і tbody... */}
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* ================= Опис та INCLUDES ================= */}

        {hasArray(city.INCLUDES) && (
          <motion.div className="p-4 bg-base-100 rounded shadow-md">
            <strong>У вартість входить:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {city.INCLUDES!.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {hasArray(city.NOTINCLUDE) && (
          <motion.div className="p-4 bg-base-100 rounded shadow-md">
            <strong>У вартість не входить:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {city.INCLUDES!.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {hasText(city.ImportantInfo) && (
          <motion.div className="p-4 bg-base-100 rounded shadow-md">
            <strong>Важлива інформація:</strong>
            <p className="mt-2 whitespace-pre-line">{city.ImportantInfo}</p>
          </motion.div>
        )}
      </div>
      <ScrollToTop />
      <FAB />
      <Footer />

      {/* MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-[90%] max-h-[90%] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Кнопка Закрити */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white text-2xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition"
            >
              ✕
            </button>

            {/* Картинка */}
            <img
              src={selectedImage.images[selectedImage.index]}
              alt="Selected"
              className="max-w-full max-h-full rounded shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
