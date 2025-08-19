import type { Metadata } from "next";
import { Merriweather, Playfair_Display, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import AOSProvider from "@/components/AOSProvider";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Home",
  description: "Online Booking Hotel",
  icons: {
    icon: "/elysian_logo.png",
    shortcut: "/elysian_logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${merriweather.variable} antialiased`}>
        <AOSProvider>
          <SessionProvider session={session}>
            <Navbar />
            <main className="bg-[var(--background)] min-h-screen">
              {children}
            </main>
            <Footer />
          </SessionProvider>
        </AOSProvider>
      </body>
    </html>
  );
}
