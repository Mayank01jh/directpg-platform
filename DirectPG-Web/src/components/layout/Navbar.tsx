"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ROUTES } from "@/constants";
import { getCurrentUser } from "@/lib/userDataStore";
import { IconUser, IconPlus } from "@/components/ui/Icons";

export default function Navbar() {
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

  const navLinks = [
    { label: "Explore Stays", href: ROUTES.LISTINGS },
    { label: "City Hubs", href: "/#categories" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Owner Portal", href: ROUTES.OWNER_DASHBOARD },
    { label: "About", href: "/about" },
  ];

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 1000,
      background: "var(--bg-translucent)",
      backdropFilter: "saturate(180%) blur(16px)",
      WebkitBackdropFilter: "saturate(180%) blur(16px)",
      borderBottom: "1px solid var(--border-color)",
    }}>
      <div className="app-container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
      }}>
        {/* Brand Logo */}
        <Link href={ROUTES.HOME} style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          textDecoration: "none",
        }}>
          <img
            src="/logo.png"
            alt="direct PG"
            style={{
              height: "34px",
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Link>

        {/* Clean Professional Desktop Navigation */}
        <nav style={{
          display: "none",
          alignItems: "center",
          gap: "1.75rem",
        }}
        className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{
                fontSize: "0.86rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                transition: "color 0.15s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right-Side Actions (Strict 60:30:10 palette) */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* List Your PG Button */}
          <Link
            href={ROUTES.OWNER_DASHBOARD}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.45rem 1.05rem",
              borderRadius: "var(--radius-pill)",
              background: "#FFFFFF",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
              fontSize: "0.82rem",
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--prism-blue)";
              e.currentTarget.style.color = "var(--prism-blue)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-color)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
          >
            <IconPlus size={14} color="currentColor" />
            <span>List PG</span>
          </Link>

          {/* User Profile or Sign In Button */}
          {currentUser ? (
            <Link
              href={ROUTES.PROFILE}
              className="ios-pill-btn ios-pill-btn-solid"
              style={{
                padding: "0.45rem 1.15rem",
                fontSize: "0.82rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
              }}
            >
              <IconUser size={14} color="#FFFFFF" />
              <span>{currentUser.name ? currentUser.name.split(" ")[0] : "Account"}</span>
            </Link>
          ) : (
            <Link
              href={ROUTES.LOGIN}
              className="ios-pill-btn ios-pill-btn-solid"
              style={{
                padding: "0.45rem 1.25rem",
                fontSize: "0.82rem",
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 820px) {
          .desktop-nav {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}