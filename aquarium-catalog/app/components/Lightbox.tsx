"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { Plant } from "@/app/data/types";
import { Button } from "@/components/ui/button";

interface LightboxProps {
  plants: Plant[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  plants,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const plant = plants[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < plants.length - 1;

  const goPrevious = useCallback(() => {
    if (hasPrevious) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, hasPrevious, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) {
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, hasNext, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowLeft") {
        goPrevious();
      }
      if (event.key === "ArrowRight") {
        goNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goPrevious, onClose]);

  if (!plant) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          onClick={(event) => event.stopPropagation()}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x > 80) {
              goPrevious();
            } else if (info.offset.x < -80) {
              goNext();
            }
          }}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
            <div className="min-w-0 pr-4">
              <p className="truncate font-heading text-base font-semibold text-foreground sm:text-lg">
                {plant.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {plant.code || "Catalog image"} · {currentIndex + 1} of{" "}
                {plants.length}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close lightbox"
              onClick={onClose}
            >
              <X />
            </Button>
          </div>

          <div className="relative aspect-[4/3] w-full bg-muted sm:aspect-[16/10]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={plant.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={plant.imagePath}
                  alt={plant.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 sm:px-6">
            <Button
              variant="outline"
              onClick={goPrevious}
              disabled={!hasPrevious}
              className="gap-1"
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={goNext}
              disabled={!hasNext}
              className="gap-1"
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
