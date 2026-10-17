import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://directpg.in";
  const currentDate = new Date().toISOString();

  const routes = [
    { url: "", priority: 1.0, changeFrequency: "daily" as const },
    { url: "/listings", priority: 0.9, changeFrequency: "hourly" as const },
    { url: "/search", priority: 0.8, changeFrequency: "daily" as const },
    { url: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/safety", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/guarantee", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/pricing", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/support", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/terms", priority: 0.5, changeFrequency: "yearly" as const },
    { url: "/privacy", priority: 0.5, changeFrequency: "yearly" as const },
    { url: "/refund", priority: 0.5, changeFrequency: "yearly" as const },
    { url: "/cookies", priority: 0.5, changeFrequency: "yearly" as const },
    { url: "/login", priority: 0.4, changeFrequency: "yearly" as const },
    { url: "/register", priority: 0.4, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
