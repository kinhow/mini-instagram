import "./globals.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Header } from "@/layout/header";
import { PageContainer } from "@/layout/page-container";
import { TanstackQueryProviders } from "@/providers/providers";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Instagram",
  description: "A mini Instagram experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body className={`${openSans.variable} antialiased`}>
        <MantineProvider defaultColorScheme="auto">
          <Notifications position="bottom-right" />
          <TanstackQueryProviders>
            <Header />
            <PageContainer>{children}</PageContainer>
          </TanstackQueryProviders>
        </MantineProvider>
      </body>
    </html>
  );
}
