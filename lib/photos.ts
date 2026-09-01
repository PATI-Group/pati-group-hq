export type Photo = {
  src: string;
  alt: string;
  wide?: boolean;
};

export const HOME_PHOTOS: Photo[] = [
  { src: "/media/home/park-selfie.webp", alt: "PATI teammates on a park outing" },
  { src: "/media/home/huddle.webp", alt: "Office huddle, hands in" },
  { src: "/media/home/workshop.webp", alt: "Sticky-note workshop" },
  { src: "/media/home/pier.webp", alt: "Team on a pier outing" },
  { src: "/media/home/kayak.webp", alt: "Beach kayak team in orange life jackets" },
  { src: "/media/home/large-group.webp", alt: "Large PATI group outdoors" },
  { src: "/media/home/park-selfie-2.webp", alt: "Park selfie with the team" },
  { src: "/media/home/fan-page.webp", alt: "PATI teammates together" },
];

/** van-hoa covers once recoded into /media/{hash}.webp */
export const CULTURE_POST_PHOTOS: Photo[] = [
  {
    src: "/media/13e12bf5-e233-4404-a74d-3a9cc7810880.webp",
    alt: "Culture tour",
  },
  {
    src: "/media/477f35f8-d4fe-4b6d-8ce7-02bf2ef7a8d2.webp",
    alt: "Always raise the bar",
  },
  {
    src: "/media/d06f8cec-fff5-4f60-9ed7-f6207d761149.webp",
    alt: "PATI Group journey",
  },
];

export const WORK_COVERS: Photo[] = [
  {
    src: "/media/4b340645-8418-4f81-9f07-c3b21f5c5cfd.webp",
    alt: "Florasis",
  },
  {
    src: "/media/424e39e4-ef42-4454-ac39-ed9bcd650b83.webp",
    alt: "AG1",
  },
  {
    src: "/media/e768c9a2-2ec9-444d-a178-856f36452649.webp",
    alt: "RYZE",
  },
  {
    src: "/media/9d79cbf2-c8b6-41bf-9a70-198f83445478.webp",
    alt: "MyObvi",
  },
];
