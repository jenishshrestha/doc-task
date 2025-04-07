"use client";

import { Nunito } from "next/font/google";
import { PT_Sans } from "next/font/google";
import useTheme from "@/hooks/useTheme";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const AppLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  const { mode } = useTheme();

  const { children } = props;
  return (
    <html lang="en" className={`text-base ${mode}`} data-theme={mode}>
      <body
        className={`${nunito.variable} ${ptSans.variable} relative antialiased`}
      >
        {children}
      </body>
    </html>
  );
};

export default AppLayout;
