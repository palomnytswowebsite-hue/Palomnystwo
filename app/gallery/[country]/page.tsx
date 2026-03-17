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
  img6?: string;
  img7?: string;
  img8?: string;
  img9?: string;
  img10?: string;

  imgName1?: string;
  imgName2?: string;
  imgName3?: string;
  imgName4?: string;
  imgName5?: string;
  imgName6?: string;
  imgName7?: string;
  imgName8?: string;
  imgName9?: string;
  imgName10?: string;
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
        const list: { img: string; title: string; country: string }[] = [];

        for (let i = 1; i <= 20; i++) {
          const img = (city as any)[`img${i}`];
          const title = (city as any)[`imgName${i}`];

          if (img) {
            list.push({
              img,
              title: title || city.Name,
              country: city.Country?.[0] || "",
            });
          }
        }

        return list;
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
        {/* Pinterest / National Geographic layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative mb-4 break-inside-avoid overflow-hidden rounded-xl group cursor-pointer"
            >
              <img
                src={img.img}
                alt={`${img.title} ${img.country}`}
                loading="lazy"
                onClick={() => setSelectedImage(img.img)}
                className="w-full transition duration-500 group-hover:scale-110"
              />

              {/* overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                <div className="text-white">
                  <h3 className="text-lg font-bold">{img.title}</h3>
                  <p className="text-sm opacity-80">{img.country}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULLSCREEN IMAGE */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
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
