"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CHROME, LANG_KEY, type Lang } from "../lib/site";

type Copy = (typeof CHROME)["en"] | (typeof CHROME)["vi"];
type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Copy };

const Language = createContext<Ctx | null>(null);

function persist(lang: Lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* ignore */
  }
  document.cookie = `${LANG_KEY}=${lang};path=/;max-age=31536000;samesite=lax`;
  document.documentElement.lang = lang;
}

export function Providers({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    let s: string | null = null;
    try {
      s = localStorage.getItem(LANG_KEY);
    } catch {
      s = null;
    }
    const next = s === "vi" || s === "en" ? s : "en";
    setLangState(next);
    persist(next);
  }, []);
  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    persist(l);
  }, []);
  const t = lang === "vi" ? CHROME.vi : CHROME.en;
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <Language.Provider value={value}>{children}</Language.Provider>;
}

export function useT() {
  const c = useContext(Language);
  if (!c) throw new Error("language");
  return c;
}
