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

interface City {
  id: string;
  Name: string;
  Country: string[];
  CountrySlug: string[];
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  img5?: string;
}

export default function CountryGalleryPage() {
  const params = useParams();

  const countryParam = Array.isArray(params.country)
    ? params.country[0]
    : params.country;

  const countrySlug = countryParam?.toLowerCase() || "";

  const [images, setImages] = useState<
    { img: string; title: string; country: string }[]
  >([]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCities = async () => {
      const snap = await getDocs(collection(db, "Cities"));

      const allCities: City[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as City[];

      const filtered = allCities.filter(
        (city) =>
          Array.isArray(city.CountrySlug) &&
          city.CountrySlug.some((slug) => slug.toLowerCase() === countrySlug),
      );

      const imgs = filtered.flatMap((city) => {
        const list = [
          city.img1,
          city.img2,
          city.img3,
          city.img4,
          city.img5,
        ].filter(Boolean);

        return list.map((img) => ({
          img: img!,
          title: city.Name,
          country: city.Country?.[0] || "",
        }));
      });

      setImages(imgs);
      setLoading(false);
    };

    if (countrySlug) loadCities();
  }, [countrySlug]);

  if (loading) return <p>Завантаження галереї...</p>;

  const countryName = images[0]?.country || "";

  return (
    <div>
      <NavLinks />
      <NavMenu />
      <h1 className="marmelad-font bg-[#E6D8C3] m-0 p-2.5 text-3xl font-bold text-center text-[#5D866C]">
        Тури для {countryName}
      </h1>
      <div className="max-w-7xl mx-auto p-10">
        {/* 🇺🇦 Українська назва */}

        {/* Pinterest layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative mb-4 break-inside-avoid group cursor-pointer"
            >
              <img
                src={img.img}
                alt={img.title}
                onClick={() => setSelectedImage(img.img)}
                className="w-full rounded-xl transition duration-300 group-hover:scale-105"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition rounded-xl flex items-center justify-center">
                <button
                  onClick={() => setSelectedImage(img.img)}
                  className="opacity-0 group-hover:opacity-100 bg-white text-black px-4 py-2 rounded-full text-sm font-semibold transition"
                >
                  Дивитись фото
                </button>
              </div>

              <div className="p-2">
                <h3 className="font-semibold">{img.title}</h3>
                <p className="text-sm opacity-60">{img.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN IMAGE */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-h-[90%] max-w-[90%] rounded-xl"
          />
        </div>
      )}

      <ScrollToTop />
      <FAB />
      <Footer />
    </div>
  );
}
