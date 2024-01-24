import "@/styles/globals.css";

import { Poppins } from "next/font/google";
import { Konkhmer_Sleokchher } from "next/font/google";

const poppins = Poppins({
  weight: '500',
  subsets: ['latin'],
});

const konk = Konkhmer_Sleokchher({
  weight: '400',
  subsets: ['latin'],
});

export const metadata = {
  title: "NoConverter",
  description: "Convert all files on the fly!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${konk.className} antialiased`}>{children}</body>
    </html>
  );
}
