"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ROUTES } from "@/constants";
import { getCurrentUser } from "@/lib/userDataStore";
import { IconUser, IconPlus, IconBuilding } from "@/components/ui/Icons";

export default function Navbar() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Force light mode removal of any old dark-mode localStorage
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("dark-mode");
      localStorage.removeItem("directpg-theme");
    }

    setCurrentUser(getCurrentUser());
    const handleUserUpdate = () => setCurrentUser(getCurrentUser());
    window.addEventListener("user-updated", handleUserUpdate);
    return () => window.removeEventListener("user-updated", handleUserUpdate);
  }, []);

  // Strict route-based role view separation:
  // Owner screens are strictly /dashboard, /my-properties, /earnings, /bookings
  const isOwnerPage =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/my-properties") ||
    pathname.startsWith("/earnings") ||
    pathname.startsWith("/bookings");

  // On tenant pages, we strictly show tenant options and NEVER show owner options (+ List PG, Host Portal badge)
  // On owner pages, we strictly show owner options and NEVER show tenant options (Explore Stays, Wishlist, etc.)
  const isOwner = isOwnerPage;

  // Strict Role-Based Navigation Links
  const ownerNavLinks = [
    { label: "Dashboard", href: ROUTES.OWNER_DASHBOARD },
    { label: "My Properties", href: ROUTES.OWNER_PROPERTIES },
    { label: "Tenant Bookings", href: ROUTES.OWNER_BOOKINGS },
    { label: "Earnings & Payouts", href: ROUTES.OWNER_EARNINGS },
  ];

  const tenantNavLinks = [
    { label: "Explore Stays", href: ROUTES.LISTINGS },
    { label: "My Bookings", href: currentUser ? "/profile?tab=bookings" : ROUTES.LOGIN },
    { label: "Saved Wishlist", href: currentUser ? "/profile?tab=saved" : ROUTES.LOGIN },
    { label: "Safety & Audit", href: "/safety" },
    { label: "DirectPG Guarantee", href: "/guarantee" },
  ];

  const activeNavLinks = isOwner ? ownerNavLinks : tenantNavLinks;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "var(--bg-translucent)",
        backdropFilter: "saturate(180%) blur(16px)",
        WebkitBackdropFilter: "saturate(180%) blur(16px)",
        borderBottom: "1px solid var(--border-color)",
      }}
    >
      <div
        className="app-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Brand Logo & Context Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link
            href={isOwner ? ROUTES.OWNER_DASHBOARD : ROUTES.HOME}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
            }}
          >
            <img
              src="/logo.png"
              alt="DirectPG"
              style={{
                height: "34px",
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Link>

          {/* Role pill indicator - ONLY ON OWNER PAGES */}
          {isOwner && (
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 800,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "0.2rem 0.55rem",
                borderRadius: "6px",
                backgroundColor: "#F1F5F9",
                color: "#0F172A",
                border: "1px solid #E2E8F0",
              }}
            >
              Host Portal
            </span>
          )}
        </div>

        {/* Clean Role-Specific Navigation */}
        <nav
          style={{
            display: "none",
            alignItems: "center",
            gap: "1.75rem",
          }}
          className="desktop-nav"
        >
          {activeNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: "0.86rem",
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? "var(--prism-blue)" : "var(--text-secondary)",
                  transition: "color 0.15s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right-Side Actions (Strict 60:30:10 palette) */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* ONLY SHOW '+ List PG' ON OWNER PAGES (NEVER ON TENANT PAGES) */}
          {isOwner && (
            <Link
              href={ROUTES.OWNER_ADD_PROPERTY}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.45rem 1.05rem",
                borderRadius: "var(--radius-pill)",
                background: "#0066FF",
                border: "none",
                color: "#FFFFFF",
                fontSize: "0.82rem",
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 3px 12px rgba(0, 102, 255, 0.28)",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <IconPlus size={14} color="#FFFFFF" />
              <span>List PG</span>
            </Link>
          )}

          {/* User Profile or Sign In Button */}
          {currentUser ? (
            <Link
              href={isOwner || currentUser.role === "owner" ? ROUTES.OWNER_DASHBOARD : ROUTES.PROFILE}
              className="ios-pill-btn ios-pill-btn-solid"
              style={{
                padding: "0.45rem 1.15rem",
                fontSize: "0.82rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                background: "#0F172A",
                color: "#FFFFFF",
              }}
            >
              <IconUser size={14} color="#FFFFFF" />
              <span>
                {currentUser.name ? currentUser.name.split(" ")[0] : isOwner ? "Host" : "Account"}
              </span>
            </Link>
          ) : (
            <Link
              href={ROUTES.LOGIN}
              className="ios-pill-btn ios-pill-btn-solid"
              style={{
                padding: "0.45rem 1.25rem",
                fontSize: "0.82rem",
                background: "#0F172A",
                color: "#FFFFFF",
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}