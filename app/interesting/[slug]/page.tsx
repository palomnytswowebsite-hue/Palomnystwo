"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import NavLinks from "@/app/Components/navLinks";
import { NavMenu } from "@/app/Components/navMenu";
import { Footer } from "@/app/Components/footer";
import { FAB } from "@/app/Components/FAB";
import ScrollToTop from "@/app/Components/ScrollToTop";

interface Place {
  id: string;
  Name: string;
  slug: string;
  img1: string;
  description: string;
}

export default function PlaceDetailPage() {
  const params = useParams();

  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0];

  const [place, setPlace] = useState<Place | null>(null);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "InterestingPlace"));

      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Place[];

      const found = list.find((p) => p.slug === slug);

      setPlace(found || null);
    };

    if (slug) load();
  }, [slug]);

  if (!place) return <p className="p-10">Завантаження...</p>;

  return (
    <div>
      <NavLinks />
      <NavMenu />

      <div className="max-w-4xl  mx-auto p-10">
        <h1 className="text-3xl text-center font-bold mb-6">{place.Name}</h1>
        <div className="flex justify-center">
          <img
            src={place.img1}
            alt={place.Name}
            className="rounded-2xl max-w-xl w-full "
          />
        </div>
        <motion.div className="p-4 bg-base-100 rounded shadow-md m-2.5">
          <p className="leading-relaxed text-lg">{place.description}</p>
        </motion.div>
      </div>

      <ScrollToTop />
      <FAB />
      <Footer />
    </div>
  );
}
