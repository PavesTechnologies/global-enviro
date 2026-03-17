export function getNewsPhotoUrl(path) {
  if (!path) {
    return "/assets/images/hero-section.png";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/news-photos/${path}`;
}
