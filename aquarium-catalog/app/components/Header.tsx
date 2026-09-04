"use client";

import { Leaf, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Leaf className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-heading text-base font-bold tracking-tight text-foreground sm:text-lg">
              Company Name
            </p>
            <p className="hidden truncate text-xs text-muted-foreground sm:block">
              Premium Aquarium Plants
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex items-center overflow-hidden transition-all duration-300",
              searchOpen ? "w-44 sm:w-64" : "w-0",
            )}
          >
            <label className="sr-only" htmlFor="catalog-search">
              Search plants
            </label>
            <input
              id="catalog-search"
              type="search"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search plants..."
              className="h-9 w-full rounded-full border border-border bg-card px-3 text-sm outline-none ring-primary/20 transition focus:ring-2"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label={searchOpen ? "Close search" : "Open search"}
            onClick={() => {
              setSearchOpen((open) => {
                if (open) {
                  onSearchChange("");
                }
                return !open;
              });
            }}
          >
            {searchOpen ? <X /> : <Search />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <p className="text-sm font-medium text-foreground">Company Name</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse our premium aquarium plant catalog.
          </p>
        </div>
      )}
    </header>
  );
}
