import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
// import { SessionProvider } from "next-auth/react";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Next Stock",
  description: "Next Stock",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} text-black bg-bgWhite`}>
        {/* <SessionProvider> */}
          {children}
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
