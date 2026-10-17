"use client";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { setCurrentUser } from "@/lib/userDataStore";
import {
  IconLock,
  IconUser,
  IconCheck,
  IconBuilding,
  IconArrowRight,
  IconShieldCheck,
} from "@/components/ui/Icons";
import toast from "react-hot-toast";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "owner" ? "owner" : "tenant";

  const [role, setRole] = useState<"tenant" | "owner">(initialRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const r = searchParams.get("role");
    if (r === "owner") setRole("owner");
  }, [searchParams]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please accept the terms of service to continue.");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      const userObj = {
        name: fullName.trim() || (role === "owner" ? "Lakshmi Narayanan" : "Mayank Sharma"),
        email: email.trim() || "user@directpg.in",
        phone: phone.trim() || "+91 98765 43210",
        role: role,
        isVerified: true,
      };

      setCurrentUser(userObj);
      setLoading(false);
      toast.success("Account created successfully!");

      if (role === "owner") {
        router.push("/dashboard");
      } else {
        router.push("/profile");
      }
    }, 450);
  };

  return (
    <div
      className="ios-card"
      style={{
        background: "var(--bg-card)",
        borderRadius: "24px",
        padding: "2rem",
        border: "1px solid var(--border-color)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
          Join DirectPG
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
          {role === "owner" ? "List your properties with zero commission fees." : "Find & book verified PGs with 0% brokerage."}
        </p>
      </div>

      {/* Role Segmented Selector */}
      <div style={{
        display: "flex",
        background: "var(--bg-tertiary)",
        padding: "4px",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border-color)",
        marginBottom: "1.25rem",
      }}>
        <button
          type="button"
          onClick={() => setRole("tenant")}
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "var(--radius-pill)",
            fontSize: "0.82rem",
            fontWeight: role === "tenant" ? 700 : 600,
            color: role === "tenant" ? "var(--text-primary)" : "var(--text-secondary)",
            background: role === "tenant" ? "var(--bg-card)" : "transparent",
            boxShadow: role === "tenant" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.35rem",
          }}
        >
          <IconUser size={15} color={role === "tenant" ? "#007AFF" : "currentColor"} />
          <span>Tenant / Student</span>
        </button>

        <button
          type="button"
          onClick={() => setRole("owner")}
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "var(--radius-pill)",
            fontSize: "0.82rem",
            fontWeight: role === "owner" ? 700 : 600,
            color: role === "owner" ? "var(--text-primary)" : "var(--text-secondary)",
            background: role === "owner" ? "var(--bg-card)" : "transparent",
            boxShadow: role === "owner" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.35rem",
          }}
        >
          <IconBuilding size={15} color={role === "owner" ? "#007AFF" : "currentColor"} />
          <span>PG Owner</span>
        </button>
      </div>

      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Mayank Sharma"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
            Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
            Mobile Number (for SMS & Smart Pass) *
          </label>
          <input
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
            Password *
          </label>
          <input
            type="password"
            required
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "var(--text-secondary)", cursor: "pointer", marginTop: "0.25rem" }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={{ accentColor: "#007AFF" }}
          />
          <span>I agree to DirectPG&apos;s Terms of Service and Privacy Policy</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="ios-pill-btn ios-pill-btn-solid"
          style={{
            width: "100%",
            padding: "0.8rem",
            fontSize: "0.92rem",
            fontWeight: 700,
            marginTop: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <span>{loading ? "Creating Account..." : role === "owner" ? "Register as PG Owner" : "Create Tenant Account"}</span>
          <IconArrowRight size={16} color="#FFFFFF" />
        </button>
      </form>

      <div style={{
        marginTop: "1.5rem",
        paddingTop: "1.25rem",
        borderTop: "1px solid var(--border-color)",
        textAlign: "center",
        fontSize: "0.82rem",
        color: "var(--text-secondary)",
      }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "#007AFF", fontWeight: 700, textDecoration: "none" }}>
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}