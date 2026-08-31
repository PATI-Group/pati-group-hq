import type { Metadata } from "next";
import { LEGAL, SOCIALS } from "../../lib/site";
import { Shell } from "../../components/archive";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Shell h="Contact" l="hr@patigroup.com · Ho Chi Minh City.">
      <section className="prose">
        <p>{LEGAL}</p>
        <p>
          <a href="mailto:hr@patigroup.com">hr@patigroup.com</a>
        </p>
        <nav className="socials" aria-label="Social">
          {SOCIALS.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </nav>
      </section>
    </Shell>
  );
}
