import type { Metadata } from "next";
import about from "../../content/about.json";
import { Shell } from "../../components/archive";
import { PhotoStrip } from "../../components/photos";
import { CULTURE_POST_PHOTOS, HOME_PHOTOS } from "../../lib/photos";

export const metadata: Metadata = { title: "Culture" };

export default function CulturePage() {
  return (
    <Shell h={about.cultureTitle} l={about.cultureOpen}>
      <PhotoStrip photos={HOME_PHOTOS} />
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
      <PhotoStrip photos={CULTURE_POST_PHOTOS} />
      <section className="prose">
        <h2>{about.saturdayTitle}</h2>
        {about.saturday.map((s) => (
          <p key={s.t}>
            <strong>{s.t}</strong> {s.b}
          </p>
        ))}
      </section>
    </Shell>
  );
}
