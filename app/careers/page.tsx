import type { Metadata } from "next";
import Link from "next/link";
import about from "../../content/about.json";
import { Pager, PostList, Shell } from "../../components/archive";
import { archivePage } from "../../lib/writing";

export const metadata: Metadata = { title: "Careers" };

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page || 1) || 1;
  const pack = archivePage("tuyen-dung", page);
  return (
    <Shell h="Careers" l={about.careersLead}>
      <p className="employer">{about.careersSite}</p>
      <PostList posts={pack.items} />
      <Pager base="/careers" page={pack.page} pages={pack.pages} />
      <p>
        <Link href="/apply" className="pill">
          Apply
        </Link>
      </p>
    </Shell>
  );
}
