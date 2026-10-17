"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "@/lib/userDataStore";
import {
  IconLock,
  IconUser,
  IconCheck,
  IconBuilding,
  IconArrowRight,
} from "@/components/ui/Icons";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"tenant" | "owner">("tenant");
  const [identifier, setIdentifier] = useState("mayank@directpg.in");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const userObj = {
        name: role === "owner" ? "Lakshmi Narayanan" : "Mayank Sharma",
        email: identifier,
        phone: "+91 98765 43210",
        role: role,
        isVerified: true,
      };

      setCurrentUser(userObj);
      setLoading(false);
      toast.success(`Welcome back, ${userObj.name}!`);

      if (role === "owner") {
        router.push("/dashboard");
      } else {
        router.push("/profile");
      }
    }, 400);
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
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.4rem" }}>
          Sign In to DirectPG
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
          Access your digital bookings, move-in passes, or PG owner console.
        </p>
      </div>

      {/* Role Segmented Selector */}
      <div style={{
        display: "flex",
        background: "var(--bg-tertiary)",
        padding: "4px",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--border-color)",
        marginBottom: "1.5rem",
      }}>
        <button
          type="button"
          onClick={() => {
            setRole("tenant");
            setIdentifier("mayank@directpg.in");
          }}
          style={{
            flex: 1,
            padding: "0.55rem",
            borderRadius: "var(--radius-pill)",
            fontSize: "0.82rem",
            fontWeight: role === "tenant" ? 700 : 600,
            color: role === "tenant" ? "var(--text-primary)" : "var(--text-secondary)",
            background: role === "tenant" ? "var(--bg-card)" : "transparent",
            boxShadow: role === "tenant" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
            border: "none",
            cursor: "pointer",
            transition: "all 0.15s ease",
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
          onClick={() => {
            setRole("owner");
            setIdentifier("owner@directpg.in");
          }}
          style={{
            flex: 1,
            padding: "0.55rem",
            borderRadius: "var(--radius-pill)",
            fontSize: "0.82rem",
            fontWeight: role === "owner" ? 700 : 600,
            color: role === "owner" ? "var(--text-primary)" : "var(--text-secondary)",
            background: role === "owner" ? "var(--bg-card)" : "transparent",
            boxShadow: role === "owner" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
            border: "none",
            cursor: "pointer",
            transition: "all 0.15s ease",
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

      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.35rem" }}>
            Email or Mobile Number
          </label>
          <input
            type="text"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)" }}>
              Password
            </label>
            <Link
              href="/forgot-password"
              style={{ fontSize: "0.78rem", color: "#007AFF", textDecoration: "none", fontWeight: 600 }}
            >
              Forgot?
            </Link>
          </div>
          <input
            type="password"
            required
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
          <span>{loading ? "Authenticating..." : role === "owner" ? "Sign In to Owner Portal" : "Sign In to DirectPG"}</span>
          <IconArrowRight size={16} color="#FFFFFF" />
        </button>
      </form>

      {/* Switch to Register */}
      <div style={{
        marginTop: "1.75rem",
        paddingTop: "1.25rem",
        borderTop: "1px solid var(--border-color)",
        textAlign: "center",
        fontSize: "0.82rem",
        color: "var(--text-secondary)",
      }}>
        Don&apos;t have an account yet?{" "}
        <Link href={`/register?role=${role}`} style={{ color: "#007AFF", fontWeight: 700, textDecoration: "none" }}>
          Create free account
        </Link>
      </div>
    </div>
  );
}