import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./modals/RegisterModal";
import LoginModal from "./modals/LoginModal";
import { Toaster } from "react-hot-toast";
import CreateListingModal from "./modals/CreateListingModal";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Airbnb clone",
  description: "Airbnb clone tutorial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}  antialiased`}>
        <Navbar />
        {children}
        <RegisterModal />
        <Toaster />
        <LoginModal />
        <CreateListingModal />
      </body>
    </html>
  );
}
