"use client";

import { useState, type FormEvent } from "react";
import { useT } from "./providers";

export function ApplyForm() {
  const { t } = useT();
  const [done, setDone] = useState(false);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="row">
        <label>
          <span className="flab">{t.formName}</span>
          <input name="name" required autoComplete="name" />
          <span className="help">{t.formNameHelp}</span>
        </label>
        <label>
          <span className="flab">{t.formEmail}</span>
          <input name="email" required autoComplete="email" inputMode="email" type="email" />
          <span className="help">{t.formEmailHelp}</span>
        </label>
      </div>
      <label>
        <span className="flab">{t.formLinks}</span>
        <textarea name="links" rows={3} />
        <span className="help">{t.formLinksHelp}</span>
      </label>
      <label>
        <span className="flab">{t.formProof}</span>
        <textarea name="proof" required rows={5} />
        <span className="help">{t.formProofHelp}</span>
      </label>
      <button className="pill" type="submit">
        {t.formSend}
      </button>
      <p className="hint">{done ? t.formDone : t.formHint}</p>
    </form>
  );
}
