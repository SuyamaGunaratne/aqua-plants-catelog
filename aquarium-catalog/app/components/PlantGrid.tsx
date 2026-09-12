"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Leaf } from "lucide-react";
import type { Plant } from "@/app/data/types";
import { PlantCard } from "@/app/components/PlantCard";

interface PlantGridProps {
  plants: Plant[];
  gridKey: string;
  onPlantClick: (index: number) => void;
}

export function PlantGrid({ plants, gridKey, onPlantClick }: PlantGridProps) {
  if (plants.length === 0) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Leaf className="size-6" aria-hidden="true" />
        </div>
        <h3 className="font-heading text-lg font-semibold text-foreground">
          No plants found
        </h3>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Try another category, subcategory, or search term to browse the
          catalog.
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={gridKey}
        layout
        className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6"
      >
        {plants.map((plant, index) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            index={index}
            onClick={() => onPlantClick(index)}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
