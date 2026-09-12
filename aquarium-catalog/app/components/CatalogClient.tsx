"use client";

import { useMemo, useState } from "react";
import type { CategoryId, Plant } from "@/app/data/types";
import { categories, plants, pottedSubcategories } from "@/app/data/plants";
import { CategoryNav } from "@/app/components/CategoryNav";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { Hero } from "@/app/components/Hero";
import { Lightbox } from "@/app/components/Lightbox";
import { PlantGrid } from "@/app/components/PlantGrid";

function matchesSubcategory(plant: Plant, subcategory: string | null) {
  if (!subcategory) {
    return true;
  }

  if (subcategory === "other") {
    return plant.subcategory === null;
  }

  if (!plant.subcategory) {
    return false;
  }

  const parts = plant.subcategory.split("/");
  if (parts[0] === "terarium" && parts[1]) {
    return parts[1] === subcategory;
  }

  return parts[0] === subcategory;
}

function matchesSearch(plant: Plant, query: string) {
  if (!query.trim()) {
    return true;
  }

  const normalized = query.trim().toLowerCase();
  return (
    plant.name.toLowerCase().includes(normalized) ||
    plant.code.toLowerCase().includes(normalized) ||
    (plant.subcategory?.toLowerCase().includes(normalized) ?? false)
  );
}

export function CatalogClient() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("tc-tubs");
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      if (plant.category !== activeCategory) {
        return false;
      }

      if (activeCategory === "potted" && !matchesSubcategory(plant, activeSubcategory)) {
        return false;
      }

      return matchesSearch(plant, searchQuery);
    });
  }, [activeCategory, activeSubcategory, searchQuery]);

  const activeCategoryLabel =
    categories.find((category) => category.id === activeCategory)?.label ??
    "Catalog";

  const handleCategoryChange = (category: CategoryId) => {
    setActiveCategory(category);
    setActiveSubcategory(null);
    setLightboxIndex(null);
  };

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Hero />
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        pottedSubcategories={pottedSubcategories}
        activeSubcategory={activeSubcategory}
        onSubcategoryChange={setActiveSubcategory}
      />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {activeCategoryLabel}
              {activeSubcategory &&
                activeCategory === "potted" &&
                ` · ${
                  pottedSubcategories.find((item) => item.id === activeSubcategory)
                    ?.label ?? activeSubcategory
                }`}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredPlants.length}{" "}
              {filteredPlants.length === 1 ? "variety" : "varieties"}
              {searchQuery.trim() ? ` matching "${searchQuery.trim()}"` : ""}
            </p>
          </div>
        </div>

        <PlantGrid
          plants={filteredPlants}
          gridKey={`${activeCategory}-${activeSubcategory ?? "all"}-${searchQuery.trim()}`}
          onPlantClick={setLightboxIndex}
        />
      </main>

      <Footer />

      {lightboxIndex !== null && filteredPlants.length > 0 && (
        <Lightbox
          plants={filteredPlants}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
