import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DirectPG – Find Your Perfect PG",
    template: "%s | DirectPG",
  },
  description:
    "Discover verified PG accommodations, hostels, and co-living spaces near you. Book instantly with DirectPG.",
  keywords: ["PG", "paying guest", "hostel", "co-living", "accommodation", "DirectPG"],
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
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
