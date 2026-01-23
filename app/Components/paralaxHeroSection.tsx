"use client";
import { useRef, useEffect } from "react";
import "../globals.css";
import { NavMenu } from "./navMenu";
export default function ParalaxHeroSection() {
  const bgBackRef = useRef<HTMLDivElement>(null);
  const bgFrontRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (bgBackRef.current) {
        bgBackRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }

      if (bgFrontRef.current) {
        bgFrontRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }

      if (textRef.current) {
        textRef.current.style.transform = `translateY(${scrollY * 0.7}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <section className="hero">
        <div ref={bgBackRef} className="bg bg-back" />
        <div ref={bgFrontRef} className="bg bg-front" />

        <h1 className="flex-col" ref={textRef}>
          <div className="text-6xl">&#x26AA;</div>Назва Компанії
        </h1>
      </section>

      <section className="content">
        <NavMenu />
      </section>
    </div>
  );
}
