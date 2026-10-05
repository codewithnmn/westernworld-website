import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import { SITE } from "@/lib/site";
import "./globals.css";

// Self-hosted at build time by next/font: no request to Google from the visitor's browser.
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--ff-display", display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--ff-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--ff-mono", display: "swap", weight: ["500"] });

export const viewport: Viewport = { themeColor: "#0e1645" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Western World Visa Services | Study Abroad Consultant in Rohtak", template: "%s | Western World Visa Services" },
  description:
    "Career counselling, university applications, IELTS / PTE / TOEFL / Duolingo coaching, SOPs, scholarships, education loans, visas, forex, flights and accommodation: every step of studying abroad under one roof.",
  keywords: [
    "Study Abroad", "Study in Canada", "Study in U.K", "Study in U.S.A", "Study in Australia", "Career in Abroad",
    "Study Abroad Programs", "Overseas Education in UK", "Overseas Education in Canada", "Overseas Education in USA",
    "Study Abroad Consultant", "Overseas Education Consultant", "MBA From Abroad", "Overseas Consultant",
    "Study Abroad after 12th", "List of Courses in Abroad", "IELTS coaching Rohtak", "PTE coaching Rohtak",
  ],
  openGraph: { type: "website", siteName: SITE.name, images: ["/images/w4.jpg"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
