// app/page.tsx
"use client";
import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("../app/Components/HomeClient"), {
  ssr: false,
});

export default function Page() {
  return <HomeClient />;
}
