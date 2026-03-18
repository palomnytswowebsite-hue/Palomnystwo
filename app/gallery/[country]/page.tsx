"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useParams } from "next/navigation";

import { NavMenu } from "@/app/Components/navMenu";
import NavLinks from "@/app/Components/navLinks";
import ScrollToTop from "@/app/Components/ScrollToTop";
import { FAB } from "@/app/Components/FAB";
import { Footer } from "@/app/Components/footer";

/* ================= TYPES ================= */

interface City {
  id: string;
  Name: string;
  Country: string[];
  CountrySlug: string[];
  [key: string]: any;
}

interface ImageItem {
  img: string;
  title: string;
  country: string;
}

/* ================= PAGE ================= */

export default function CountryGalleryPage() {
  const params = useParams();

  const countryParam = Array.isArray(params.country)
    ? params.country[0]
    : params.country;

  const countrySlug = countryParam?.toLowerCase().trim() || "";

  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const [loading, setLoading] = useState(true);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const loadCities = async () => {
      try {
        const snap = await getDocs(collection(db, "Cities"));

        const allCities: City[] = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as City[];

        const filtered = allCities.filter(
          (city) =>
            Array.isArray(city.CountrySlug) &&
            city.CountrySlug.some(
              (slug) => slug?.toLowerCase().trim() === countrySlug,
            ),
        );

        const imgs = filtered.flatMap((city) => {
          const list: ImageItem[] = [];

          Object.keys(city).forEach((key) => {
            const value = city[key];

            if (
              key.toLowerCase().includes("img") &&
              typeof value === "string" &&
              value.startsWith("http")
            ) {
              list.push({
                img: value,
                title: city.Name,
                country: city.Country?.[0] || "",
              });
            }
          });

          if (list.length === 0) {
            list.push({
              img: "https://via.placeholder.com/600x400",
              title: city.Name,
              country: city.Country?.[0] || "",
            });
          }

          return list;
        });

        setImages(imgs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    if (countrySlug) loadCities();
  }, [countrySlug]);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  /* ================= RESET ZOOM ================= */

  useEffect(() => {
    if (selectedIndex !== null) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  }, [selectedIndex]);

  /* ================= KEYBOARD ================= */

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") setSelectedIndex(null);

      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % images.length : null,
        );
      }

      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + images.length) % images.length : null,
        );
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, images.length]);

  /* ================= ZOOM ================= */

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = scale - e.deltaY * 0.001;
    setScale(Math.min(Math.max(1, newScale), 4));
  };

  /* ================= DRAG ================= */

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  /* ================= UI ================= */

  if (loading) return <p className="text-center mt-10">Завантаження...</p>;

  const countryName = images[0]?.country || "Тур";

  return (
    <div>
      <NavLinks />
      <NavMenu />

      <h1 className="marmelad-font bg-[#E6D8C3] p-3 text-3xl text-center text-[#5D866C]">
        Галерея: {countryName}
      </h1>

      <div className="max-w-7xl mx-auto p-6">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative mb-4 break-inside-avoid rounded-xl overflow-hidden cursor-pointer group"
            >
              <img
                src={img.img}
                alt={img.title}
                loading="lazy"
                onClick={() => setSelectedIndex(i)}
                className="w-full transition duration-500 ease-out group-hover:scale-110"
              />

              {/* GLASS EFFECT */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4 bg-gradient-to-t from-black/40 via-transparent to-transparent">
                <div className="w-full rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 p-4 text-white shadow-xl transform translate-y-5 group-hover:translate-y-0 transition-all duration-300">
                  <h3 className="font-semibold text-lg">{img.title}</h3>
                  <p className="text-sm opacity-80">{img.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)}
        >
          <button className="absolute top-5 right-5 text-white text-3xl">
            ✕
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev !== null
                  ? (prev - 1 + images.length) % images.length
                  : null,
              );
            }}
            className="absolute left-5 text-white text-3xl"
          >
            ←
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIndex((prev) =>
                prev !== null ? (prev + 1) % images.length : null,
              );
            }}
            className="absolute right-5 text-white text-3xl"
          >
            →
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="cursor-grab"
          >
            <img
              src={selectedImage.img}
              className="max-h-[80vh] max-w-[90vw] rounded-xl"
              style={{
                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
              }}
            />
          </div>

          <div className="text-white mt-4 text-center">
            <h2 className="text-xl font-bold">{selectedImage.title}</h2>
            <p>{selectedImage.country}</p>
          </div>
        </div>
      )}

      <ScrollToTop />
      <FAB />
      <Footer />
    </div>
  );
}
