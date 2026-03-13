import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/scroll/SmoothScroll";
import CookiePopup from "@/components/CookiePopup";
import PublicNavbar from "@/components/PublicNavbar";
import Navbar from "@/components/Navbar";
import SessionWrapper from "@/components/SessionWrapper";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "GetMeABoost",
  description: "GetMeABoost - This website is a crowdfunding platform for creators.",
  icons: {
    icon: "logo_dark.png"
  }
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} relative antialiased bg-[#222] text-white`}
      >
        <SmoothScroll>
          <Suspense fallback={<PublicNavbar />}>
            <SessionWrapper>
              <Navbar />
            </SessionWrapper>
          </Suspense>
          <main className="min-h-[83.8vh]">
            {children}
          </main>
          <Footer />
          <CookiePopup />
        </SmoothScroll>
      </body>
    </html>
  );
}
