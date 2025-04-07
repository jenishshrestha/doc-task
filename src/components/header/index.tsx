"use client";
/**
 * ==============================================================================
 * Header Component
 * @description This component renders the header of the application.
 * @returns JSX element for the header component
 * ==============================================================================
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import useTheme from "@/hooks/useTheme";

const Header = () => {
  // custom hook
  const { handleThemeToggle } = useTheme();

  return (
    <>
      <header className="bg-card flex items-center justify-between rounded-t-lg border-b-2 p-4">
        <h1 className="text-base font-medium">
          <Link href="/" className="logo">
            Review Screen
          </Link>
        </h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleThemeToggle()}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </header>
    </>
  );
};

export default Header;
