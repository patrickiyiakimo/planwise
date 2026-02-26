import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import FooterContainer from "@/containers/footer/FooterContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Planwise - AI-Powered Project Management",
  description: "Planwise is an AI-powered project management tool that helps students plan, track, and execute projects efficiently. Planwise streamlines students workflows and boosts productivity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <FooterContainer />
      </body>
    </html>
  );
}
