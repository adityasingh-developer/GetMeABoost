import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/scroll/SmoothScroll";
import SessionWrapper from "@/components/SessionWrapper";
import CookiePopup from "@/components/CookiePopup";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} relative antialiased bg-[#222] text-white`}
      >
        <SessionWrapper>
          <SmoothScroll>
            <Navbar />
            <main className="min-h-[92.3vh] mt-20">
              {children}
            </main>
            <Footer />
            <CookiePopup />
          </SmoothScroll>
        </SessionWrapper>
      </body>
    </html>
  );
}
