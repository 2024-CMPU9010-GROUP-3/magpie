import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Magpie - Services at a glance",
  description: "An at a glance view of available public services across Dublin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
