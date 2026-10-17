"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addCustomProperty } from "@/lib/userDataStore";
import { PGProperty } from "@/lib/mockData";
import {
  IconBuilding,
  IconCheck,
  IconPlus,
  IconMapPin,
  IconRupee,
  IconShieldCheck,
} from "@/components/ui/Icons";
import toast from "react-hot-toast";

export default function AddPropertyPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("Bangalore");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "any">("any");
  const [startingPrice, setStartingPrice] = useState("12000");
  const [deposit, setDeposit] = useState("12000");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "High-speed WiFi (300 Mbps)",
    "Air Conditioning",
    "Three Homely Meals Included",
    "Biometric Smart Lock",
    "Power Backup 24/7",
    "Washing Machine / Laundry",
  ]);

  const availableAmenities = [
    "High-speed WiFi (300 Mbps)",
    "Air Conditioning",
    "Three Homely Meals Included",
    "Biometric Smart Lock",
    "Power Backup 24/7",
    "Washing Machine / Laundry",
    "Daily Professional Housekeeping",
    "RO Purified Water",
    "Gym & Fitness Center",
    "CCTV Security 24x7",
    "Attached Bathroom with Geyser",
    "Terrace Garden & Lounge",
  ];

  const handleToggleAmenity = (item: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !address.trim() || !startingPrice) {
      toast.error("Please fill in all required property details.");
      return;
    }

    const priceNum = parseInt(startingPrice, 10);
    const depositNum = parseInt(deposit, 10) || priceNum;
    const newId = `custom-${Date.now()}`;

    const newProperty: PGProperty = {
      id: newId,
      title: title.trim(),
      city: city,
      address: address.trim(),
      gender: gender,
      badge: "Newly Added",
      rating: 4.9,
      reviewCount: 1,
      startingPrice: priceNum,
      depositAmount: depositNum,
      images: [
        imageUrl,
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      ],
      description: `${title} is a fully-equipped, modern PG in ${city}. Features high-speed fiber internet, chef-prepared meals, daily housekeeping, and 24x7 biometric safety. Zero brokerage verified by DirectPG.`,
      amenities: selectedAmenities,
      rules: [
        "Gate closes at 11:00 PM for tenant safety",
        "No smoking or loud music inside corridors",
        "Guests allowed in common lounge till 8:00 PM",
        "Strict adherence to biometric access guidelines",
      ],
      roomPlans: [
        {
          id: "plan-" + Date.now() + "-1",
          type: "single",
          name: "Single Occupancy AC",
          price: priceNum,
          monthlyRent: priceNum,
          deposit: depositNum,
          availableBeds: 2,
          features: ["Private Attached Balcony", "Air Conditioning", "Orthopedic Mattress", "Work Desk & Ergonomic Chair"],
        },
        {
          id: "plan-" + Date.now() + "-2",
          type: "double",
          name: "Double Sharing AC",
          price: Math.round(priceNum * 0.7),
          monthlyRent: Math.round(priceNum * 0.7),
          deposit: Math.round(depositNum * 0.7),
          availableBeds: 4,
          features: ["Air Conditioning", "Dedicated Wardrobe", "High-speed Ethernet Port", "Attached Washroom"],
        },
      ],
      owner: {
        name: "Lakshmi Narayanan",
        phone: "+91 98450 12847",
        whatsapp: "+91 98450 12847",
        experience: "5+ years verified host",
        verified: true,
        responseTime: "Under 15 mins",
      },
    };

    addCustomProperty(newProperty);
    toast.success("PG successfully published! Live on DirectPG catalog.");
    router.push("/my-properties");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "3rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <Link href="/my-properties" style={{ color: "var(--text-secondary)", fontSize: "0.85rem", textDecoration: "none" }}>
            ← Back to Properties
          </Link>
        </div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)" }}>
          List a New PG Accommodation
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginTop: "0.25rem" }}>
          Publish your hostel or co-living space on DirectPG with 0% brokerage and verified tenant leads.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Basic Info Card */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "20px",
          padding: "1.75rem",
          border: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconBuilding size={18} color="#007AFF" />
            <span>Basic Property Information</span>
          </h2>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              PG / Hostel Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Amber Court Executive Co-Living"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                City *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
              >
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                Occupant Type *
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
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
              >
                <option value="any">Unisex Co-Living (All)</option>
                <option value="female">Girls PG Only</option>
                <option value="male">Boys PG Only</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              Full Locality & Street Address *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 142, 5th Cross, Near Sony World Signal, Koramangala"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
        </div>

        {/* Pricing & Deposit */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "20px",
          padding: "1.75rem",
          border: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconRupee size={18} color="#007AFF" />
            <span>Pricing & Security Deposit</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                Starting Monthly Rent (₹/mo) *
              </label>
              <input
                type="number"
                required
                min={2000}
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
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
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                Refundable Security Deposit (₹)
              </label>
              <input
                type="number"
                min={0}
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
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
          </div>
        </div>

        {/* Verified Amenities Checklist */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "20px",
          padding: "1.75rem",
          border: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <IconShieldCheck size={18} color="#007AFF" />
            <span>Select Available Amenities</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
            {availableAmenities.map((amenity) => {
              const isChecked = selectedAmenities.includes(amenity);
              return (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => handleToggleAmenity(amenity)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    padding: "0.65rem 0.85rem",
                    borderRadius: "12px",
                    background: isChecked ? "var(--apple-blue-light)" : "var(--bg-secondary)",
                    border: isChecked ? "1.5px solid #007AFF" : "1px solid var(--border-color)",
                    color: isChecked ? "#007AFF" : "var(--text-primary)",
                    fontSize: "0.82rem",
                    fontWeight: isChecked ? 700 : 500,
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: "4px",
                    border: isChecked ? "none" : "1.5px solid var(--border-divider)",
                    background: isChecked ? "#007AFF" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {isChecked && <IconCheck size={12} color="#FFFFFF" strokeWidth={3} />}
                  </div>
                  <span>{amenity}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Photo URL */}
        <div className="ios-card" style={{
          background: "var(--bg-card)",
          borderRadius: "20px",
          padding: "1.75rem",
          border: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
        }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Cover Photograph
          </h2>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
              High-Resolution Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
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
        </div>

        {/* Submit Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
          <Link
            href="/my-properties"
            className="ios-pill-btn"
            style={{ padding: "0.75rem 1.75rem", fontSize: "0.9rem" }}
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="ios-pill-btn ios-pill-btn-solid"
            style={{ padding: "0.75rem 2rem", fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <IconCheck size={16} color="#FFFFFF" strokeWidth={3} />
            <span>Publish Property Live</span>
          </button>
        </div>
      </form>
    </div>
  );
}