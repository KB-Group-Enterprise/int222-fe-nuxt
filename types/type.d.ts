import { Category, Publisher, Retailer } from "./types";

export interface GameForm {
  gameName: string;
  description: string;
  basePrice?: number;
  publisher: Publisher;
  categories: Category[];
  retailers: Retailer[];
}
