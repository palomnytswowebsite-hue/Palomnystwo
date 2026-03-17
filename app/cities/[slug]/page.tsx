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

/* ================= TYPES ================= */
interface PriceRow {
  type?: string;
  albutPrice?: string;
  preferential?: string;
  kids3and14?: string;
}

interface DebrecenPriceRow {
  type?: string;
  albutPrice?: string;
  preferential?: string;
  eveningEntry?: string;
  extraForSaunaEntry?: string;
}

interface MediterraneanPriceRow {
  albutPrice?: string;
  preferential?: string;
  family?: string;
  kidsBefore3?: string;
}

interface City {
  id: string;
  docId?: string; // Для UpcomingTours
  Name?: string;
  slug?: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  img5?: string;
  img6?: string;
  img7?: string;
  img8?: string;
  img9?: string;
  img10?: string;
  img11?: string;
  chatInfo?: string;
  RouteBy?: string;
  Confession?: string[];
  description?: string;
  DateOfBeggining?: any;
  DateOfEnd?: any;
  Duration?: string;
  Route?: string;
  TourPrice?: string;
  INCLUDES?: string[];
  NOTINCLUDE?: string[];
  Country?: string[];
  ImportantInfo?: string;
  typeUa?: string[];
  allDates?: { label: string; value: number }[];
  nearestDate?: string;
  nearestDateValue?: number;
  thermalNymphsPrice?: PriceRow[];
  thermalBathsOfDebrecenPrice?: DebrecenPriceRow[];
  mediterraneanWaterPark?: MediterraneanPriceRow[];
  [key: string]: any;
}

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

/* ================= PAGE ================= */
export default function CityPage() {
  const params = useParams();
  const rawSlug = params.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState<[string, string][]>([]);

  useEffect(() => {
    const fetchCity = async () => {
      if (!slug) return;

      try {
        const q = query(collection(db, "Cities"), where("slug", "==", slug));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const docSnap = snapshot.docs[0];
          const raw = docSnap.data();

          /* =================== Дати туру =================== */
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

          /* =================== План туру =================== */
          const plan: [string, string][] = Object.keys(raw)
            .filter((key) => key.startsWith("Day"))
            .sort()
            .map((key) => [key, raw[key]]);

          setDays(plan);

          /* =================== Підколекції =================== */
          const thermalNymphsSnap = await getDocs(
            collection(db, "Cities", docSnap.id, "thermalNymphsPrice"),
          );

          const debrecenSnap = await getDocs(
            collection(db, "Cities", docSnap.id, "thermalBathsOfDebrecenPrice"),
          );

          const mediterraneanSnap = await getDocs(
            collection(db, "Cities", docSnap.id, "mediterraneanWaterPark"),
          );

          const thermalNymphsPrice: PriceRow[] = thermalNymphsSnap.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            }),
          ) as PriceRow[];

          const thermalBathsOfDebrecenPrice: DebrecenPriceRow[] =
            debrecenSnap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as DebrecenPriceRow[];

          const mediterraneanWaterPark: MediterraneanPriceRow[] =
            mediterraneanSnap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as MediterraneanPriceRow[];

          /* =================== Встановлюємо city =================== */
          setCity({
            id: docSnap.id,
            docId: docSnap.id, // Для UpcomingTours
            ...raw,
            allDates,
            nearestDate: nearest?.label,
            nearestDateValue: nearest?.value,
            thermalNymphsPrice,
            thermalBathsOfDebrecenPrice,
            mediterraneanWaterPark,
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
    city.img11,
  ].filter(hasText);

  return (
    <div>
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

      <div className="max-w-4xl mx-auto p-6 space-y-10">
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
            {/* ================= Дати ================= */}
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
                  {city.allDates!.map((d, i: number) => (
                    <li key={i}>{d.label}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* ================= Інші блоки ================= */}
            {hasArray(city.Country) && (
              <motion.div className="p-4 bg-base-100 rounded shadow-md">
                <strong>Країна:</strong> {city.Country!.join(", ")}
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
                  {city.typeUa!.map((type, i) => (
                    <li key={i}>{type}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {hasArray(city.Confession) && (
              <motion.div className="p-4 bg-base-100 rounded shadow-md">
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
        {/* ================= Таблиця майбутніх турів ================= */}
        {city.docId && (
          <div className="max-w-4xl mx-auto p-6">
            <UpcomingTours cityDocId={city.docId} />
          </div>
        )}
        {/* ================= Опис ================= */}
        {hasText(city.description) && (
          <motion.div className="p-4 bg-base-100 rounded shadow-md">
            <strong>Опис:</strong>
            <p className="mt-2 whitespace-pre-line">{city.description}</p>
          </motion.div>
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

        {/* ================= Дні та Day3 priceTable ================= */}
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

            {key === "Day3" && (
              <>
                {/* ================= Таблиця thermalNymphsPrice ================= */}
                {hasArray(city.thermalNymphsPrice) && (
                  <div className="p-4 bg-[#86B0BD] rounded shadow-md overflow-x-auto">
                    <strong className="text-white ">
                      Ціни Аквапарку Німфея:
                    </strong>
                    <table className="table  w-full mt-4 text-center">
                      <thead className="bg-[#86B0BD] text-white text-center">
                        <tr>
                          <th>Тип квитка</th>
                          <th>Дорослий</th>
                          <th>Студентський / пенсійний 65+</th>
                          <th>Дитячий 3 – 14 р.</th>
                          <th>Дитячий до 3 р.</th>
                        </tr>
                      </thead>
                      <tbody className="bg-[#FFF0DD] text-[#000000] text-center">
                        {city.thermalNymphsPrice!.map((row, i) => (
                          <tr key={i}>
                            <td>{row.type}</td>
                            <td>{row.albutPrice}</td>
                            <td>{row.preferential}</td>
                            <td>{row.kids3and14}</td>
                            <td>БЕЗКОШТОВНО</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* ================= Таблиця thermalBathsOfDebrecenPrice ================= */}
                {hasArray(city.thermalBathsOfDebrecenPrice) && (
                  <div className="p-4 bg-[#86B0BD] rounded shadow-md overflow-x-auto">
                    <strong className="text-white">
                      Ціни на квитки у термальні купальні Дебрецену:
                    </strong>
                    <table className="table w-full mt-4 text-center">
                      <thead className="bg-[#86B0BD] text-white text-center">
                        <tr>
                          <th>Тип квитка</th>
                          <th>Дорослий</th>
                          <th>Студентський / пенсійний 65+</th>
                          <th>Дитячий 3 – 14 р.</th>
                          <th>Додатково за сауну</th>
                        </tr>
                      </thead>
                      <tbody className="bg-[#FFF0DD] text-[#000000] text-center">
                        {city.thermalBathsOfDebrecenPrice!.map((row, i) => (
                          <tr key={i}>
                            <td>{row.type}</td>
                            <td>{row.albutPrice}</td>
                            <td>{row.preferential}</td>
                            <td>{row.eveningEntry}</td>
                            <td>{row.extraForSaunaEntry}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* ================= Таблиця mediterraneanWaterPark ================= */}
                {hasArray(city.mediterraneanWaterPark) && (
                  <div className="p-4 bg-[#86B0BD] rounded shadow-md overflow-x-auto">
                    <strong className="text-white">
                      Ціни Середземноморський Аквапарк:
                    </strong>
                    <table className="table w-full mt-4 text-center">
                      <thead className="bg-[#86B0BD] text-white text-center">
                        <tr>
                          <th>Дорослий</th>
                          <th>Студентський / пенсійний 65+</th>
                          <th>Сімейний 2 дор + 1 дит.</th>
                          <th>Вхід для дітей до 3 р.</th>
                        </tr>
                      </thead>
                      <tbody className="bg-[#FFF0DD] text-[#000000] text-center">
                        {city.mediterraneanWaterPark!.map((row, i) => (
                          <tr key={i}>
                            <td>{row.albutPrice}</td>
                            <td>{row.preferential}</td>
                            <td>{row.family}</td>
                            <td>{row.kidsBefore3}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {/* ================= Опис та INCLUDES ================= */}

        {hasArray(city.INCLUDES) && (
          <motion.div className="p-4 bg-base-100 rounded shadow-md">
            <strong>У вартість входить:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {city.INCLUDES!.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {hasArray(city.NOTINCLUDE) && (
          <motion.div className="p-4 bg-base-100 rounded shadow-md">
            <strong>У вартість не входить:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {city.NOTINCLUDE!.map((item, i) => (
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
    </div>
  );
}
