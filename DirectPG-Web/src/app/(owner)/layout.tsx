"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ROUTES } from "@/constants";
import {
  IconBuilding,
  IconCalendar,
  IconRupee,
  IconTrendingUp,
  IconPlus,
} from "@/components/ui/Icons";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const ownerTabs = [
    { label: "Dashboard", href: ROUTES.OWNER_DASHBOARD, icon: IconTrendingUp },
    { label: "My Properties", href: ROUTES.OWNER_PROPERTIES, icon: IconBuilding },
    { label: "Tenant Bookings", href: ROUTES.OWNER_BOOKINGS, icon: IconCalendar },
    { label: "Earnings & Payouts", href: ROUTES.OWNER_EARNINGS, icon: IconRupee },
  ];

  return (
    <>
      <Navbar />
      <div style={{ background: "var(--bg-secondary)", minHeight: "85vh", paddingBottom: "4rem" }}>
        {/* Owner Portal Sub-Navigation Bar */}
        <div style={{
          background: "var(--bg-card)",
          borderBottom: "1px solid var(--border-color)",
          position: "sticky",
          top: 64,
          zIndex: 900,
          backdropFilter: "saturate(180%) blur(16px)",
          WebkitBackdropFilter: "saturate(180%) blur(16px)",
        }}>
          <div className="app-container" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                background: "var(--apple-blue-light)",
                color: "#007AFF",
                padding: "0.25rem 0.6rem",
                borderRadius: "6px",
                fontSize: "0.75rem",
                fontWeight: 800,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}>
                Owner Hub
              </div>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                DirectPG Partner Central
              </span>
            </div>

            {/* Sub-nav Pills */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "var(--bg-tertiary)",
              padding: "4px",
              borderRadius: "var(--radius-pill)",
              border: "1px solid var(--border-color)",
              overflowX: "auto",
            }}>
              {ownerTabs.map((tab) => {
                const isActive = pathname === tab.href;
                const Icon = tab.icon;
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.4rem 0.95rem",
                      borderRadius: "var(--radius-pill)",
                      fontSize: "0.82rem",
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? "#007AFF" : "var(--text-secondary)",
                      background: isActive ? "var(--bg-card)" : "transparent",
                      boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <Icon size={15} color={isActive ? "#007AFF" : "currentColor"} />
                    <span>{tab.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Quick Action */}
            <Link
              href={ROUTES.OWNER_ADD_PROPERTY}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.45rem 1.1rem",
                borderRadius: "var(--radius-pill)",
                background: "#007AFF",
                color: "#FFFFFF",
                fontSize: "0.82rem",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 3px 12px rgba(0, 122, 255, 0.35)",
                transition: "transform 0.15s ease",
              }}
            >
              <IconPlus size={15} color="#FFFFFF" />
              <span>Add PG</span>
            </Link>
          </div>
        </div>

        {/* Child Pages */}
        <div className="app-container" style={{ paddingTop: "2rem" }}>
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
