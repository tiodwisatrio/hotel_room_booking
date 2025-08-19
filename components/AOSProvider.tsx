"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      easing: "ease-out-cubic",
      mirror: false,
    });

    // refresh to detect newly mounted elements (useful for Suspense/async content)
    AOS.refresh();

    // small delayed refresh for late mounted content
    const t = setTimeout(() => AOS.refresh(), 300);

    return () => {
      clearTimeout(t);
    };
  }, [pathname]);

  return <>{children}</>;
}
