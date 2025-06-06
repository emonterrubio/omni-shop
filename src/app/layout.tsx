import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Omni Shopping - IT Equipment Store",
  description: "Your one-stop shop for IT equipment and accessories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 