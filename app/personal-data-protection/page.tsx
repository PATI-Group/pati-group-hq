import type { Metadata } from "next";
import { PolicyPage } from "../../components/policy-page";

export const metadata: Metadata = { title: "Personal Data Protection Policy" };

export default function PersonalDataProtectionRoute() {
  return <PolicyPage />;
}
