"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants";

export default function Footer() {
  const pathname = usePathname();

  const isOwnerPage =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/my-properties") ||
    pathname.startsWith("/earnings") ||
    pathname.startsWith("/bookings");

  const tenantSections = [
    {
      title: "Explore Stays",
      links: [
        { label: "Top Charts", href: "#top-charts" },
        { label: "Featured Collections", href: "/" },
        { label: "Girls Only Hostels", href: "/search?gender=female" },
        { label: "Boys Only Hostels", href: "/search?gender=male" },
        { label: "Unisex Co-Living", href: "/search?gender=any" },
        { label: "Zero Deposit Stays", href: "/search?filter=zero_deposit" },
      ],
    },
    {
      title: "Popular Hubs",
      links: [
        { label: "Bangalore (Koramangala, HSR)", href: "/search?city=Bangalore" },
        { label: "Mumbai (Bandra, Powai, Andheri)", href: "/search?city=Mumbai" },
        { label: "Delhi NCR (North Campus, Noida)", href: "/search?city=Delhi" },
        { label: "Hyderabad (Madhapur, Gachibowli)", href: "/search?city=Hyderabad" },
        { label: "Pune (Hinjewadi, Wakad, Viman Nagar)", href: "/search?city=Pune" },
        { label: "Chennai (OMR, Guindy, Velachery)", href: "/search?city=Chennai" },
      ],
    },
    {
      title: "DirectPG Trust & Safety",
      links: [
        { label: "42-Point Physical Inspection", href: "/about" },
        { label: "Biometric Keyless Access", href: "/safety" },
        { label: "Zero Brokerage Guarantee", href: "/guarantee" },
        { label: "Direct Owner Contact", href: "/about" },
        { label: "Tenant Verified Reviews", href: "/#testimonials" },
      ],
    },
    {
      title: "Tenant Support & Legal",
      links: [
        { label: "About DirectPG", href: ROUTES.ABOUT },
        { label: "Tenant Help & Support", href: "/support" },
        { label: "Refund Policy", href: "/refund" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  const ownerSections = [
    {
      title: "Host Management",
      links: [
        { label: "Host Dashboard", href: ROUTES.OWNER_DASHBOARD },
        { label: "My Properties", href: ROUTES.OWNER_PROPERTIES },
        { label: "Tenant Bookings", href: ROUTES.OWNER_BOOKINGS },
        { label: "Earnings & Payouts", href: ROUTES.OWNER_EARNINGS },
        { label: "List New PG", href: ROUTES.OWNER_ADD_PROPERTY },
      ],
    },
    {
      title: "Partner Central",
      links: [
        { label: "DirectPG Verified Partner Standards", href: "/about" },
        { label: "Automated Rent Collection", href: "/pricing" },
        { label: "Biometric Integration Support", href: "/safety" },
        { label: "Escrow Payout Guidelines", href: "/guarantee" },
      ],
    },
    {
      title: "Host Legal & Policies",
      links: [
        { label: "Host Terms of Service", href: "/terms" },
        { label: "Partner Privacy Policy", href: "/privacy" },
        { label: "Cancellation & Refund Terms", href: "/refund" },
        { label: "Platform Standards", href: "/safety" },
      ],
    },
    {
      title: "Host Support",
      links: [
        { label: "Dedicated Host Help Desk", href: "/support" },
        { label: "Listing Optimization FAQ", href: "/support" },
        { label: "Account Settings", href: ROUTES.OWNER_DASHBOARD },
      ],
    },
  ];

  const footerSections = isOwnerPage ? ownerSections : tenantSections;

  return (
    <footer style={{
      background: "var(--bg-secondary)",
      borderTop: "1px solid var(--border-color)",
      padding: "3rem 0 2rem",
      fontSize: "0.82rem",
      color: "var(--text-secondary)",
      transition: "background-color 0.3s ease, border-color 0.3s ease",
    }}>
      <div className="app-container">
        {/* Top Disclaimer / Store Footnote */}
        <div style={{
          paddingBottom: "1.75rem",
          marginBottom: "2rem",
          borderBottom: "1px solid var(--border-color)",
          fontSize: "0.75rem",
          color: "var(--text-caption)",
          lineHeight: 1.6,
        }}>
          {isOwnerPage
            ? "* DirectPG Partner Central empowers PG and hostel operators with zero-brokerage direct tenant acquisition, automated escrow payouts, and smart digital leases."
            : "* DirectPG is India's premier direct-to-owner student housing and co-living discovery marketplace. All listings displayed are verified for physical existence, amenities, and owner identity. Zero brokerage applies to direct bookings made through the DirectPG portal."}
        </div>

        {/* 4 Column Navigation Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "2rem",
          marginBottom: "2.5rem",
        }}>
          {footerSections.map((sec) => (
            <div key={sec.title}>
              <h4 style={{
                fontSize: "0.76rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "0.85rem",
              }}>
                {sec.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {sec.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        color: "var(--text-secondary)",
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--apple-blue)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Legal / Apple-style Store Footer */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--border-color)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <img
              src="/logo-icon.png"
              alt="DirectPG Verified Stays"
              style={{
                height: "26px",
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
            <span style={{ fontSize: "0.78rem" }}>
              DirectPG Technologies Pvt. Ltd. • CIN: U72900KA2026PTC198420 • Koramangala 4th Block, Bangalore • All rights reserved.
            </span>
          </div>

          <div style={{ display: "flex", gap: "1.25rem", fontSize: "0.76rem", flexWrap: "wrap" }}>
            <Link href="/privacy" style={{ color: "var(--text-secondary)" }}>Privacy</Link>
            <span>•</span>
            <Link href="/terms" style={{ color: "var(--text-secondary)" }}>Terms</Link>
            <span>•</span>
            <Link href="/refund" style={{ color: "var(--text-secondary)" }}>Refunds</Link>
            <span>•</span>
            <Link href="/cookies" style={{ color: "var(--text-secondary)" }}>Cookies</Link>
            <span>•</span>
            <Link href="/sitemap.xml" style={{ color: "var(--text-secondary)" }}>Sitemap</Link>
            <span>•</span>
            <span style={{ color: "var(--apple-blue)", fontWeight: 600 }}>India (English)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}