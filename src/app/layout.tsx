import { HeaderComponent } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sprout Pokemon",
  description: "Frontend Test Sprout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <HeaderComponent />
        {children}
        <Image
          src={{
            src: "/pokeball.svg",
            width: 512,
            height: 512,
          }}
          alt="pokeball-logo"
          className="
            w-[224px] sm:w-[320px] lg:w-[416px] 2xl:w-[512px] h-auto m-0 opacity-25
            absolute top-0 left-0 right-0 bottom-0 mx-auto my-auto -z-20
          "
        />
      </body>
    </html>
  );
}
