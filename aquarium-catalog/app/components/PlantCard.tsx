"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Plant } from "@/app/data/types";
import { cn } from "@/lib/utils";

interface PlantCardProps {
  plant: Plant;
  index: number;
  onClick: () => void;
}

export function PlantCard({ plant, index, onClick }: PlantCardProps) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.2) }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={cn(
        "group w-full overflow-hidden rounded-2xl bg-card text-left shadow-sm ring-1 ring-border/70",
        "transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={plant.imagePath}
          alt={plant.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="space-y-1 p-3">
        <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
          {plant.name}
        </p>
        {plant.code && (
          <p className="text-xs text-muted-foreground">{plant.code}</p>
        )}
      </div>
    </motion.button>
  );
}
