import Link from "next/link";
import about from "../content/about.json";
import { PhotoStrip } from "../components/photos";
import { CULTURE_POST_PHOTOS, HOME_PHOTOS } from "../lib/photos";

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero">
        <img
          className="hero-photo"
          src="/media/home/park-selfie.webp"
          alt="PATI teammates on a park outing"
          width={1280}
          height={720}
        />
        <div className="hero-read" aria-hidden />
        <div className="copy">
          <h1>PATI Group</h1>
          <p className="lead">{about.welcome}</p>
          <Link href="/apply" className="pill">
            Apply
          </Link>
        </div>
      </section>
      <section className="strip-wrap" aria-label="PATI people">
        <PhotoStrip photos={[...HOME_PHOTOS, ...CULTURE_POST_PHOTOS]} />
      </section>
      <section className="band">
        <h2>About</h2>
        <p className="lead">{about.aboutShort}</p>
      </section>
      <section className="band">
        <p className="kicker">Core Values</p>
        <ol className="steps">
          {about.values.map((v) => (
            <li key={v.name}>
              <h2>{v.name}</h2>
            </li>
          ))}
        </ol>
        <p>
          <Link href="/apply" className="pill">
            Apply
          </Link>
        </p>
      </section>
    </main>
  );
}
