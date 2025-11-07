import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Draggable Buttons",
  description: "Interactive draggable buttons with color toggle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
