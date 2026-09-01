import type { Metadata } from "next";
import { Filters, Pager, PostList, Shell } from "../../components/archive";
import { archivePage, ensureWriting, writingCategories } from "../../lib/writing";

export const metadata: Metadata = { title: "Writing" };

export default async function WritingPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; page?: string }>;
}) {
  await ensureWriting();
  const sp = await searchParams;
  const cat = writingCategories.some((c) => c.id === sp.cat) ? sp.cat : undefined;
  const page = Number(sp.page || 1) || 1;
  const pack = archivePage(cat, page);
  return (
    <Shell h="Writing" l="The PATI Group archive, hosted here.">
      <p className="count">
        {pack.allCount} posts · {pack.publicCount} public · {pack.gatedCount} gated
      </p>
      <Filters base="/writing" active={cat} />
      <PostList posts={pack.items} />
      <Pager base="/writing" cat={cat} page={pack.page} pages={pack.pages} />
    </Shell>
  );
}
