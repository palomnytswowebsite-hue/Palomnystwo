"use client";

import { useRef, useEffect } from "react";
import "../../app/globals.css";
import { City } from "../Components/HomeClient";
import { NavMenu } from "./navMenu";
import { CardCityList } from "./CardCityList";
import { AboutUs } from "./aboutUs";
import { ContactSection } from "./contactSection";
import { Footer } from "./footer";

interface Props {
  cities: City[];
  loading: boolean;
  selectedType?: string;
  selectedCountry?: string;
  setType: (v?: string) => void;
  setCountry: (v?: string) => void;
}

export default function ParalaxHeroSection({
  cities,
  loading,
  selectedType,
  selectedCountry,
  setType,
  setCountry,
}: Props) {
  const bgBackRef = useRef<HTMLDivElement>(null);
  const bgFrontRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Проста паралакс-анімація
  useEffect(() => {
    const handleScroll = () => {
      if (bgBackRef.current && bgFrontRef.current && textRef.current) {
        const offset = window.scrollY;
        bgBackRef.current.style.transform = `translateY(${offset * 0.2}px)`;
        bgFrontRef.current.style.transform = `translateY(${offset * 0.5}px)`;
        textRef.current.style.transform = `translateY(${offset * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <section className="hero relative  flex items-center justify-center text-white">
        <div ref={bgBackRef} className="absolute inset-0 bg bg-back" />
        <div ref={bgFrontRef} className="absolute inset-0 bg bg-front" />
        <h1
          className="flex flex-col items-center text-6xl relative z-10"
          ref={textRef}
        >
          <div className="text-6xl mb-2">&#x26AA;</div>
          AVE MARIA
        </h1>
      </section>

      <section className="content ">
        <NavMenu
          selectedType={selectedType}
          selectedCountry={selectedCountry}
          setType={setType}
          setCountry={setCountry}
        />
        <div className="px-4 md:px-10">
          <CardCityList cities={cities} loading={loading} />

          <AboutUs />
          <ContactSection />
        </div>
        <Footer />
      </section>
    </div>
  );
}
