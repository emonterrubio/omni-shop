import type { Metadata } from "next";
import "./styles/globals.css";
import { CartProvider } from "../components/CartContext";
import { ToastProvider } from "../components/ToastContext";
import { ToastContainer } from "../components/ui/ToastContainer";

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
      <body>
        <ToastProvider>
          <CartProvider>
            {children}
            <ToastContainer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
} 