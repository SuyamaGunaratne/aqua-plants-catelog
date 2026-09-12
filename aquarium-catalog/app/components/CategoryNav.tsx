"use client";

import type { CategoryConfig, CategoryId } from "@/app/data/types";
import { cn } from "@/lib/utils";

interface SubcategoryOption {
  id: string;
  label: string;
}

interface CategoryNavProps {
  categories: CategoryConfig[];
  activeCategory: CategoryId;
  onCategoryChange: (category: CategoryId) => void;
  pottedSubcategories: SubcategoryOption[];
  activeSubcategory: string | null;
  onSubcategoryChange: (subcategory: string | null) => void;
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 snap-start rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-card text-muted-foreground ring-1 ring-border hover:bg-[#F0FDFA] hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function CategoryNav({
  categories,
  activeCategory,
  onCategoryChange,
  pottedSubcategories,
  activeSubcategory,
  onSubcategoryChange,
}: CategoryNavProps) {
  return (
    <div className="sticky top-16 z-40 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="scrollbar-none flex gap-2 overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <Chip
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.label}
            </Chip>
          ))}
        </div>

        {activeCategory === "potted" && (
          <div className="scrollbar-none flex snap-x snap-mandatory gap-2 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Chip
              active={activeSubcategory === null}
              onClick={() => onSubcategoryChange(null)}
            >
              All
            </Chip>
            {pottedSubcategories.map((subcategory) => (
              <Chip
                key={subcategory.id}
                active={activeSubcategory === subcategory.id}
                onClick={() => onSubcategoryChange(subcategory.id)}
              >
                {subcategory.label}
              </Chip>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
