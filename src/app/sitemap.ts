import { MetadataRoute } from "next";

const WEBSITE_HOST_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://demo.savvio.digital";

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
    staticRoute: "/confirmation"
  },
  {
    staticRoute: "/scanner"
  }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const normalizedBaseUrl = WEBSITE_HOST_URL.replace(/\/$/, "");

  const routes = StaticRoutes.map((route) => ({
    url: route.staticRoute === "/" ? `${normalizedBaseUrl}/` : `${normalizedBaseUrl}${route.staticRoute}`,
    lastModified: new Date().toISOString(),
    changeFrequency,
    priority: 1
  }));

  return [...routes];
}
