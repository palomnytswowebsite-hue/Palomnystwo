"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useParams } from "next/navigation";

import NavLinks from "@/app/Components/navLinks";
import { NavMenu } from "@/app/Components/navMenu";
import { Footer } from "@/app/Components/footer";
import { FAB } from "@/app/Components/FAB";
import ScrollToTop from "@/app/Components/ScrollToTop";

interface Place {
  id: string;
  Name: string;
  slug: string;
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

      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-6">{place.Name}</h1>

        <p className="leading-relaxed text-lg">{place.description}</p>
      </div>

      <ScrollToTop />
      <FAB />
      <Footer />
    </div>
  );
}
