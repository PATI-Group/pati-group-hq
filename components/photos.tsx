import type { Photo } from "../lib/photos";

export function PhotoStrip({
  photos,
  className = "photo-strip",
}: {
  photos: Photo[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {photos.map((p) => (
        <li key={p.src} className={p.wide ? "wide" : undefined}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt={p.alt} width={800} height={600} loading="lazy" />
        </li>
      ))}
    </ul>
  );
}
