import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";
import AppLayout from "@/components/layouts/appLayout";

export const metadata: Metadata = {
  title: "Review Screen - DocSumo AI",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <AppLayout>{children}</AppLayout>
    </ReduxProvider>
  );
}
