import { MetadataRoute } from "next";

const WEBSITE_HOST_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://chivasregalterrace.com";

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

const changeFrequency: ChangeFrequency = "daily";

const StaticRoutes = [
  {
    staticRoute: "/"
  },
  {
    staticRoute: "/registration"
  },
  {
    staticRoute: "/terms"
  },
  {
    staticRoute: "/privacy"
  },
  {
    staticRoute: "/faq"
  }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = StaticRoutes.map((route) => ({
    url: `${WEBSITE_HOST_URL}/${route.staticRoute}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
    priority: 1
  }));

  return [...routes];
}
