import type { Metadata } from "next";
import { PolicyPage } from "../../components/policy-page";

export const metadata: Metadata = { title: "Chính sách bảo vệ dữ liệu cá nhân" };

export default function ChinhSachBaoVeDuLieuRoute() {
  return <PolicyPage />;
}
