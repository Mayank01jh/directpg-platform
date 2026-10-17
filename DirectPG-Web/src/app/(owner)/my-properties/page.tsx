"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllCombinedProperties, PGProperty } from "@/lib/mockData";
import {
  IconBuilding,
  IconMapPin,
  IconPlus,
  IconStar,
  IconCheck,
  IconEye,
  IconEdit,
  IconSearch,
} from "@/components/ui/Icons";
import toast from "react-hot-toast";

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState<PGProperty[]>([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "maintenance">("all");

  useEffect(() => {
    setProperties(getAllCombinedProperties());
    const handleProps = () => setProperties(getAllCombinedProperties());
    window.addEventListener("properties-updated", handleProps);
    return () => window.removeEventListener("properties-updated", handleProps);
  }, []);

  const filtered = properties.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.city.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.address.toLowerCase().includes(searchFilter.toLowerCase());
    return matchSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Top Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        <div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
            My PG Properties
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Manage room allocations, pricing tiers, amenities, and verify listings on DirectPG.
          </p>
        </div>

        <Link
          href="/my-properties/add"
          className="ios-pill-btn ios-pill-btn-solid"
          style={{ fontSize: "0.85rem", padding: "0.55rem 1.25rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
        >
          <IconPlus size={16} color="#FFFFFF" />
          <span>Add New PG</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div
        className="ios-card"
        style={{
          background: "var(--bg-card)",
          borderRadius: "16px",
          padding: "1rem 1.25rem",
          border: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          background: "var(--bg-secondary)",
          padding: "0.45rem 0.95rem",
          borderRadius: "var(--radius-pill)",
          border: "1px solid var(--border-color)",
          width: "100%",
          maxWidth: "340px",
        }}>
          <IconSearch size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search your properties..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-primary)",
              fontSize: "0.85rem",
              width: "100%",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setStatusFilter("all")}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "var(--radius-pill)",
              fontSize: "0.8rem",
              fontWeight: 600,
              background: statusFilter === "all" ? "var(--apple-blue-light)" : "transparent",
              color: statusFilter === "all" ? "#007AFF" : "var(--text-secondary)",
              border: statusFilter === "all" ? "1px solid rgba(0, 122, 255, 0.3)" : "1px solid transparent",
              cursor: "pointer",
            }}
          >
            All ({properties.length})
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "var(--radius-pill)",
              fontSize: "0.8rem",
              fontWeight: 600,
              background: statusFilter === "active" ? "var(--apple-blue-light)" : "transparent",
              color: statusFilter === "active" ? "#007AFF" : "var(--text-secondary)",
              border: statusFilter === "active" ? "1px solid rgba(0, 122, 255, 0.3)" : "1px solid transparent",
              cursor: "pointer",
            }}
          >
            Live (Verified)
          </button>
        </div>
      </div>

      {/* Property Cards List */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {filtered.map((p) => (
          <div
            key={p.id}
            className="ios-card"
            style={{
              background: "var(--bg-card)",
              borderRadius: "20px",
              border: "1px solid var(--border-color)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Image Header */}
            <div style={{ position: "relative", height: "170px" }}>
              <img
                src={p.images[0]}
                alt={p.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                padding: "0.25rem 0.65rem",
                borderRadius: "var(--radius-pill)",
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(8px)",
                color: "#FFFFFF",
                fontSize: "0.74rem",
                fontWeight: 700,
              }}>
                {p.gender === "female" ? "Girls PG" : p.gender === "male" ? "Boys PG" : "Unisex"}
              </span>

              <span style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                padding: "0.25rem 0.65rem",
                borderRadius: "var(--radius-pill)",
                background: "#34C759",
                color: "#FFFFFF",
                fontSize: "0.74rem",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
              }}>
                <IconCheck size={12} color="#FFFFFF" strokeWidth={3} /> Verified
              </span>
            </div>

            {/* Details Body */}
            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  {p.title}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                  <IconStar size={14} color="#FF9500" />
                  <span>{p.rating}</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                <IconMapPin size={14} color="var(--text-muted)" />
                <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {p.address}
                </span>
              </div>

              {/* Room Tiers */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.4rem" }}>
                {p.roomPlans.map((r) => (
                  <span
                    key={r.type}
                    style={{
                      fontSize: "0.72rem",
                      padding: "0.2rem 0.55rem",
                      borderRadius: "6px",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {r.name}: ₹{(r.monthlyRent || r.price || 0).toLocaleString("en-IN")}
                  </span>
                ))}
              </div>

              {/* Bottom Actions */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "0.9rem",
                marginTop: "auto",
                borderTop: "1px solid var(--border-color)",
              }}>
                <div>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Min. Rent</span>
                  <div style={{ fontSize: "1rem", fontWeight: 800, color: "#007AFF" }}>
                    ₹{(p.startingPrice || p.minPrice || 0).toLocaleString("en-IN")}/mo
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => toast.success(`Property ${p.title} settings opened.`)}
                    style={{
                      padding: "0.4rem 0.85rem",
                      borderRadius: "var(--radius-pill)",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <IconEdit size={13} color="currentColor" />
                    <span>Edit</span>
                  </button>

                  <Link
                    href={`/listings/${p.id}`}
                    style={{
                      padding: "0.4rem 0.95rem",
                      borderRadius: "var(--radius-pill)",
                      background: "#007AFF",
                      color: "#FFFFFF",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <IconEye size={13} color="#FFFFFF" />
                    <span>View</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}