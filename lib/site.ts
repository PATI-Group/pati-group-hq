export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/patigroup" },
  { label: "Facebook", href: "https://www.facebook.com/patigroupagency" },
  { label: "Instagram", href: "https://www.instagram.com/pati.group/" },
  { label: "Threads", href: "https://www.threads.com/@pati.group" },
] as const;

export const LEGAL =
  "CÔNG TY TNHH PATI GROUP AGENCY · Shophouse Midtown M7 Signature, Đ. Số 15, Phú Mỹ Hưng, Tân Mỹ, TP.HCM · hr@patigroup.com";

export const NAV = [
  ["/", "Home", "Trang chủ"],
  ["/about", "About", "Về PATI"],
  ["/culture", "Culture", "Văn hóa"],
  ["/work", "Work", "Việc"],
  ["/careers", "Careers", "Tuyển dụng"],
  ["/writing", "Writing", "Viết"],
  ["/contact", "Contact", "Liên hệ"],
] as const;

export const PAGE_SIZE = 24;
export const LANG_KEY = "pati-lang";

export type Lang = "en" | "vi";

export const CHROME = {
  en: {
    skip: "Skip to content",
    homeAria: "PATI GROUP, home",
    menu: "Menu",
    langAria: "Language",
    cta: "Apply",
    preview: "Preview only. DNS is not moved. Do not point patigroup.com here yet.",
    formName: "Name",
    formNameHelp: "The name you use at work.",
    formEmail: "Email",
    formEmailHelp: "We reply from hr@patigroup.com.",
    formLinks: "Links",
    formLinksHelp: "Portfolio, LinkedIn, writing, or shipped work.",
    formProof: "Proof of values",
    formProofHelp: "Honor Our Word / Play Like A Teamsport / Foster Innovation.",
    formSend: "Apply",
    formHint: "This preview does not send email.",
    formDone: "Recorded on this machine only. Nothing was sent.",
    gated: "Gated",
    gatedNote: "Gated on Substack. Public preview only.",
    all: "All",
    page: "Page",
    prev: "Previous",
    next: "Next",
    nf: "This route is not on the map.",
    writingCount: (n: number, pub: number, g: number) =>
      `${n} posts · ${pub} public · ${g} gated`,
    valuesK: "Core Values",
    workLead: "Case studies published on PATI Group Substack.",
    writingLead: "The PATI Group archive, hosted here.",
    applyLead: "Proof of Honor Our Word / Play Like A Teamsport / Foster Innovation. The same ask as PATI Substack JDs.",
    contactLead: "hr@patigroup.com · Ho Chi Minh City.",
  },
  vi: {
    skip: "Tới nội dung",
    homeAria: "PATI GROUP, trang chủ",
    menu: "Mục lục",
    langAria: "Ngôn ngữ",
    cta: "Apply",
    preview: "Chỉ preview. DNS chưa chuyển. Chưa trỏ patigroup.com vào đây.",
    formName: "Tên",
    formNameHelp: "Tên bạn dùng khi làm việc.",
    formEmail: "Email",
    formEmailHelp: "Chúng tôi trả lời từ hr@patigroup.com.",
    formLinks: "Links",
    formLinksHelp: "Portfolio, LinkedIn, writing, hoặc việc đã ship.",
    formProof: "Proof of values",
    formProofHelp: "Honor Our Word / Play Like A Teamsport / Foster Innovation.",
    formSend: "Apply",
    formHint: "Preview này không gửi email.",
    formDone: "Chỉ ghi trên máy này.",
    gated: "Gated",
    gatedNote: "Gated trên Substack. Chỉ bản xem công khai.",
    all: "Tất cả",
    page: "Trang",
    prev: "Trước",
    next: "Sau",
    nf: "Route này không có trên bản đồ.",
    writingCount: (n: number, pub: number, g: number) =>
      `${n} bài · ${pub} public · ${g} gated`,
    valuesK: "Core Values",
    workLead: "Case study đăng trên Substack PATI Group.",
    writingLead: "Toàn bộ archive PATI Group, lưu tại đây.",
    applyLead: "Proof of Honor Our Word / Play Like A Teamsport / Foster Innovation. Cùng yêu cầu trên JD Substack của PATI.",
    contactLead: "hr@patigroup.com · TP. Hồ Chí Minh.",
  },
} as const;
