"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheckIcon, LockIcon } from "@/components/ui/Icons";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("dpg_cookie_consent");
    if (!consent) {
      // Delay slightly for smooth appearance
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type: "all" | "essential") => {
    localStorage.setItem("dpg_cookie_consent", type);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      role="region"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "1.5rem",
        right: "1.5rem",
        maxWidth: "680px",
        margin: "0 auto",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: "16px",
        padding: "1.25rem 1.5rem",
        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            backgroundColor: "#F1F5F9",
            color: "#0066FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ShieldCheckIcon width={20} height={20} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#0F172A", margin: "0 0 0.25rem 0" }}>
            Privacy & Cookie Preferences
          </h2>
          <p style={{ fontSize: "0.8125rem", color: "#64748B", margin: 0, lineHeight: 1.5 }}>
            We use strictly essential cookies for secure authentication and optional analytical cookies to optimize accommodation search speed. We do not sell your personal data. Read our{" "}
            <Link
              href="/cookies"
              style={{ color: "#0066FF", fontWeight: 600, textDecoration: "underline" }}
            >
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              style={{ color: "#0066FF", fontWeight: 600, textDecoration: "underline" }}
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => handleAccept("essential")}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "#475569",
            backgroundColor: "#F8FAFC",
            border: "1px solid #CBD5E1",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          Essential Only
        </button>
        <button
          onClick={() => handleAccept("all")}
          style={{
            padding: "0.5rem 1.25rem",
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "#FFFFFF",
            backgroundColor: "#0066FF",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          Accept All Cookies
        </button>
      </div>
    </aside>
  );
}
