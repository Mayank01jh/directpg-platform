"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark-mode"));
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "var(--bg-secondary)",
    }}>
      {/* Auth Top Header */}
      <header style={{
        padding: "1.25rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border-color)",
        background: "var(--bg-card)",
      }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <img
            src={isDark ? "/logo-dark.png" : "/logo.png"}
            alt="direct PG"
            style={{ height: "32px", width: "auto" }}
          />
        </Link>

        <Link
          href="/"
          style={{
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          ← Return to Store
        </Link>
      </header>

      {/* Main Centered Content */}
      <main style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2.5rem 1rem",
      }}>
        <div style={{ width: "100%", maxWidth: "440px" }}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: "1.5rem 2rem",
        textAlign: "center",
        fontSize: "0.78rem",
        color: "var(--text-caption)",
        borderTop: "1px solid var(--border-color)",
      }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "0.5rem" }}>
          <Link href="/privacy" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Privacy</Link>
          <Link href="/terms" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Terms of Service</Link>
          <Link href="/support" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Help & Support</Link>
        </div>
        <div>DirectPG Inc. Verified Student & Professional Housing. Zero Brokerage.</div>
      </footer>
    </div>
  );
}
