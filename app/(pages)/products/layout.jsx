"use client"

import { Inter } from "next/font/google";
import "../globals.css";
import client from "@/apollo/client/client";
import { ApolloProvider } from '@apollo/client';
import SideBar from '@/app/_components/sideBar';

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({ children }) {
//   return (
//    {children}
//   )
// }

// export const metadata = {
//   title: 'Next.js',
//   description: 'Generated by Next.js',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
        <SideBar />
          {children}
        </ApolloProvider>
      </body>
    </html>
  );
}