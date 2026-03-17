"use client";

import BentoGallery from "@/components/BentoGallery";
import { getNewsPhotoUrl } from "@/lib/newsPhotos";

export default function NewsGalleryList({ items }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const images = item.photo_urls?.length
          ? item.photo_urls.map((photo) => getNewsPhotoUrl(photo))
          : [getNewsPhotoUrl(null)];

        return (
          <article
            key={item.id}
            className="news-card overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-2xl"
          >
            <BentoGallery photos={images} />

            <div className="news-card-body p-6">
              <h2 className="mb-2 text-xl font-semibold text-blue-800">
                {item.title}
              </h2>
              <p className="mb-3 text-sm text-gray-500">
                {item.event_date
                  ? new Date(item.event_date).toLocaleDateString()
                  : "Upcoming"}
              </p>
              <p className="news-card-content text-sm text-gray-700">
                {item.content}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
