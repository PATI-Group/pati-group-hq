"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LEGAL, NAV, SOCIALS } from "../lib/site";
import { Mark } from "./mark";
import { useT } from "./providers";

function Socials() {
  return (
    <nav className="socials" aria-label="Social">
      {SOCIALS.map((s) => (
        <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
          {s.label}
        </a>
      ))}
    </nav>
  );
}

export function Chrome({ children }: { children: ReactNode }) {
  const { lang, setLang, t } = useT();
  const path = usePathname();
  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <header className="header">
        <div className="bar">
          <Link href="/" className="brand" aria-label={t.homeAria}>
            <Mark />
          </Link>
          <nav className="desktop-nav" aria-label="Primary">
            {NAV.map(([href, en, vi]) => (
              <Link
                key={href}
                href={href}
                className={path === href || (href !== "/" && path.startsWith(href)) ? "link on" : "link"}
              >
                {lang === "vi" ? vi : en}
              </Link>
            ))}
          </nav>
          <div className="lang" role="group" aria-label={t.langAria}>
            <button type="button" className={lang === "en" ? "on" : undefined} aria-pressed={lang === "en"} onClick={() => setLang("en")}>
              EN
            </button>
            <span aria-hidden>|</span>
            <button type="button" className={lang === "vi" ? "on" : undefined} aria-pressed={lang === "vi"} onClick={() => setLang("vi")}>
              VI
            </button>
          </div>
          <Link href="/apply" className="pill">
            {t.cta}
          </Link>
          <details className="menu">
            <summary>{t.menu}</summary>
            <nav>
              {NAV.map(([href, en, vi]) => (
                <Link key={href} href={href} className="link">
                  {lang === "vi" ? vi : en}
                </Link>
              ))}
              <Link href="/apply" className="pill">
                {t.cta}
              </Link>
            </nav>
          </details>
        </div>
      </header>
      {children}
      <footer className="footer">
        <Mark />
        <p className="legal">{LEGAL}</p>
        <Socials />
        <p className="preview">{t.preview}</p>
      </footer>
    </>
  );
}
