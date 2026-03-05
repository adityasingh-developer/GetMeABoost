import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/scroll/SmoothScroll";
import SessionWrapper from "@/components/SessionWrapper";
import CookiePopup from "@/components/CookiePopup";
import ReCaptchaProvider from "@/components/ReCaptchaProvider";

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
  const captchaSiteKey = process.env.CAPTCHA_SITE_KEY;

  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} relative antialiased bg-[#222] text-white`}
      >
        <ReCaptchaProvider siteKey={captchaSiteKey}>
          <SessionWrapper>
            <SmoothScroll>
              <Navbar />
              <main className="min-h-[83.8vh]">
                {children}
              </main>
              <Footer />
              <CookiePopup />
            </SmoothScroll>
          </SessionWrapper>
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
