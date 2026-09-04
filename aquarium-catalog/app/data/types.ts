export type CategoryId = "tc-tubs" | "potted" | "bunches" | "gallery" | "mosses";

export interface CategoryConfig {
  id: CategoryId;
  label: string;
  order: number;
}

export interface Plant {
  id: string;
  name: string;
  code: string;
  category: CategoryId;
  subcategory: string | null;
  imagePath: string;
}
