import { Category, Publisher, Retailer } from "./types";

export interface GameForm {
  gameName: string;
  description: string;
  basePrice?: number;
  releaseDate: string;
  publisher: Publisher;
  categories: Category[];
  retailers: Retailer[];
}

export interface FilterOption {
  sortBy: string;
  order: string;
  filterBy: string[];
  filter: string[];
}
