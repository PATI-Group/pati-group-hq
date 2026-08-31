import type { Metadata } from "next";
import about from "../../content/about.json";
import { Shell } from "../../components/archive";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <Shell h="About" l={about.aboutShort}>
      <section className="prose">
        <h2>Vision</h2>
        <p>{about.vision}</p>
        <ul className="list">
          {about.visionGoals.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
        <p>{about.aboutLead}</p>
      </section>
      <ol className="steps">
        {about.values.map((v) => (
          <li key={v.name}>
            <h2>{v.name}</h2>
            <ul className="list">
              {v.behaviors.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Shell>
  );
}
