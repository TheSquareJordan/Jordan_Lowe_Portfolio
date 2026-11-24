"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export default function SiteChrome() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
