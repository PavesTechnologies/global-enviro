import { headers } from "next/headers";
import NewsGalleryList from "@/components/news/NewsGalleryList";

async function getNews() {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") || "http";
  const baseUrl = process.env.NEXTAUTH_URL || `${protocol}://${host}`;

  const response = await fetch(`${baseUrl}/api/news`, { cache: "no-store" });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export default async function NewsAndEventsPage() {
  const items = await getNews();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-16">
      <h1 className="mb-12 text-center text-4xl font-bold text-blue-900">
        News & Events
      </h1>
      <NewsGalleryList items={items} />
    </div>
  );
}
