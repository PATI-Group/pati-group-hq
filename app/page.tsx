import Link from "next/link";
import about from "../content/about.json";

export default function HomePage() {
  return (
    <main id="main">
      <section className="hero">
        <img
          className="hero-photo"
          src="/media/hero.webp"
          alt="PATI Group teammates outdoors"
          width={1280}
          height={720}
        />
        <div className="hero-grade" aria-hidden />
        <div className="hero-read" aria-hidden />
        <div className="copy">
          <h1>PATI Group</h1>
          <p className="lead">{about.welcome}</p>
          <Link href="/apply" className="pill">
            Apply
          </Link>
        </div>
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
