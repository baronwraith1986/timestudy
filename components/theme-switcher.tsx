"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  const getIconColor = (value: string) => {
    if (theme === value) return "text-primary"; // Necco red when active
    return "text-muted-foreground";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-primary/10 rounded-md"
          title="Switch theme"
        >
          {theme === "light" ? (
            <Sun key="light" size={ICON_SIZE} className={getIconColor("light")} />
          ) : theme === "dark" ? (
            <Moon key="dark" size={ICON_SIZE} className={getIconColor("dark")} />
          ) : (
            <Laptop key="system" size={ICON_SIZE} className={getIconColor("system")} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-content bg-card border border-border rounded-md shadow-md"
        align="start"
      >
        <DropdownMenuRadioGroup value={theme} onValueChange={(e) => setTheme(e)}>
          <DropdownMenuRadioItem className="flex gap-2" value="light">
            <Sun size={ICON_SIZE} className={getIconColor("light")} />{" "}
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="dark">
            <Moon size={ICON_SIZE} className={getIconColor("dark")} />{" "}
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2" value="system">
            <Laptop size={ICON_SIZE} className={getIconColor("system")} />{" "}
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
