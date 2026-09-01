import type { Metadata } from "next";
import { LEGAL_COMPANY, OFFICE_ADDRESS, OFFICE_MAPS_APP, SOCIALS } from "../../lib/site";
import { Shell } from "../../components/archive";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Shell h="Contact">
      <section className="prose">
        <p>{LEGAL_COMPANY}</p>
        <p>
          <a href={OFFICE_MAPS_APP} target="_blank" rel="noopener noreferrer">
            {OFFICE_ADDRESS}
          </a>
        </p>
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
