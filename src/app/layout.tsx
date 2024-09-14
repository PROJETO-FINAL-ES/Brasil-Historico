'use client';

import { usePathname } from 'next/navigation';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'aos/dist/aos.css';

import { EB_Garamond } from "next/font/google";
import Header from '@/components/Header';
import "./globals.css";
import "./variables.css";

const ebGaramond = EB_Garamond({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Conditionally render the Header
  const showHeader = pathname !== '/' && pathname !== '/register';

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.4/font/bootstrap-icons.min.css" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Baskervville+SC&display=swap" rel="stylesheet" />
      </head>
      <body className={ebGaramond.className}>
        {showHeader && <Header />}
        {children}
      </body>
    </html>
  );
}
