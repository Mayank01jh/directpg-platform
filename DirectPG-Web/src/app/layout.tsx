import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://directpg.in";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "DirectPG – Zero Brokerage PG & Coliving Accommodation",
    template: "%s | DirectPG",
  },
  description:
    "Discover verified PG accommodations, hostels, and coliving residences in Bangalore, Hyderabad, Pune, Delhi NCR, and Mumbai with zero brokerage and verified reviews.",
  keywords: [
    "PG near me",
    "zero brokerage PG",
    "coliving spaces",
    "hostels in Bangalore",
    "paying guest accommodation",
    "DirectPG verified",
    "student housing",
  ],
  authors: [{ name: "DirectPG Technologies Pvt. Ltd." }],
  creator: "DirectPG",
  publisher: "DirectPG Technologies",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: appUrl,
    siteName: "DirectPG",
    title: "DirectPG – Zero Brokerage PG & Coliving Accommodation",
    description:
      "Find 100% physically audited PGs, transparent pricing, and instant online room reservation with zero brokerage fees.",
    images: [
      {
        url: "/logo-full.png",
        width: 1200,
        height: 630,
        alt: "DirectPG Verified Accommodation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DirectPG – Zero Brokerage PG Accommodation",
    description: "Verified coliving and hostels with instant online booking and 100% refund guarantee.",
    images: ["/logo-full.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org JSON-LD Structured Data for LodgingBusiness and Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${appUrl}/#organization`,
        name: "DirectPG Technologies Pvt. Ltd.",
        url: appUrl,
        logo: `${appUrl}/logo-full.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-80-4567-8900",
          contactType: "customer support",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "80 Feet Road, 4th Block, Koramangala",
          addressLocality: "Bangalore",
          addressRegion: "Karnataka",
          postalCode: "560034",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${appUrl}/#website`,
        url: appUrl,
        name: "DirectPG",
        description: "Zero Brokerage PG & Coliving Accommodation Platform",
        publisher: {
          "@id": `${appUrl}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${appUrl}/listings?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <CookieConsent />
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
