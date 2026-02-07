import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "솔로이벤트 - 이벤트 탐색",
  description: "로테이션 소개팅, 혼술바, 파티 이벤트를 한눈에 탐색하세요.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0F1115",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} font-sans antialiased bg-[#0F1115] text-gray-100 min-h-dvh`}
      >
        <div className="mx-auto max-w-md min-h-dvh">
          {children}
        </div>
      </body>
    </html>
  );
}
