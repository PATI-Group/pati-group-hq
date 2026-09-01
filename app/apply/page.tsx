import type { Metadata } from "next";
import { ApplyForm } from "../../components/apply-form";
import { Shell } from "../../components/archive";

export const metadata: Metadata = { title: "Apply" };

export default function ApplyPage() {
  return (
    <Shell
      h="Apply"
      l="Proof of Honor Our Word / Play Like A Teamsport / Foster Innovation. The same ask as PATI JDs."
    >
      <ApplyForm />
    </Shell>
  );
}
