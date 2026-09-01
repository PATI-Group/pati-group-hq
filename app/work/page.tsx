import type { Metadata } from "next";
import { Pager, PostList, Shell } from "../../components/archive";
import { PhotoStrip } from "../../components/photos";
import { HOME_PHOTOS, WORK_COVERS } from "../../lib/photos";
import { archivePage, ensureWriting } from "../../lib/writing";

export const metadata: Metadata = { title: "Work" };

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  await ensureWriting();
  const sp = await searchParams;
  const page = Number(sp.page || 1) || 1;
  const pack = archivePage("case-study", page);
  return (
    <Shell h="Work" l="Case studies published on PATI Group Substack.">
      <PhotoStrip photos={WORK_COVERS} />
      <PhotoStrip photos={HOME_PHOTOS.slice(0, 4)} />
      <p className="count">{pack.allCount} case studies</p>
      <PostList posts={pack.items} />
      <Pager base="/work" page={pack.page} pages={pack.pages} />
    </Shell>
  );
}
