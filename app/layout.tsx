import type { Metadata } from "next";
import { Geist, Geist_Mono,Noto_Kufi_Arabic
 } from "next/font/google";
import "./globals.css";
import Header from "@/compontents/Header/Header";
import Footer from "@/compontents/Footer";
import toast, { Toaster } from 'react-hot-toast';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-kufi-arabic",
}); 

export const metadata: Metadata = {
  title: "Cloud hosting",
  description: "cloud hosting is a web hosting service that uses cloud computing technology to provide scalable and flexible hosting solutions for websites and applications. With cloud hosting, resources such as CPU, RAM, and storage are distributed across multiple servers, allowing for better performance and reliability. Cloud hosting also offers features such as automatic scaling, load balancing, and high availability, making it an ideal choice for businesses of all sizes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={notoKufiArabic.className}
      >
        <Toaster />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
