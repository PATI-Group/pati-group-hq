import type { Metadata } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";
import { Chrome } from "../components/chrome";
import { Providers } from "../components/providers";
import about from "../content/about.json";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});
const display = Roboto_Condensed({
  subsets: ["latin", "vietnamese"],
  weight: "700",
  variable: "--font-display-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "PATI Group", template: "%s · PATI Group" },
  description: about.welcome,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>
        <Providers>
          <Chrome>{children}</Chrome>
        </Providers>
      </body>
    </html>
  );
}
