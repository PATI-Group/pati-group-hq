import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="shell">
      <header className="shell-hero">
        <h1>This route is not on the map.</h1>
        <p className="lead">Preview only. DNS is not moved.</p>
        <Link href="/" className="pill">
          Apply
        </Link>
      </header>
    </main>
  );
}
