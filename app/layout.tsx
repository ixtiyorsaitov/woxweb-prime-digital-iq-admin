import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WoxWeb Prime digital IQ",
  description: "WoxWeb Prime digital IQ admin paneli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${poppins.className} antialiased overflow-hidden selection:bg-primary dark:selection:text-black selection:text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
