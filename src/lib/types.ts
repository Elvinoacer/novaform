export type CategorySlug =
  | "modern"
  | "luxury"
  | "bungalows"
  | "maisonettes"
  | "villas"
  | "small-homes";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  /** Lucide icon name */
  icon: string;
  cover: string;
}

export interface Specification {
  label: string;
  value: string;
}

export interface FloorPlan {
  label: string;
  /** inline SVG markup — rendered inside the viewer */
  svg: string;
}

export interface GalleryItem {
  id: string;
  type: "image" | "video" | "panoramic";
  src: string;
  poster?: string;
  caption?: string;
  /** layout hint in the mixed gallery */
  span?: "full" | "wide" | "tall" | "square" | "small";
}

export interface House {
  id: string;
  slug: string;
  name: string;
  /** short poetic subtitle */
  tagline: string;
  category: CategorySlug;
  style: string;
  bedrooms: number;
  bathrooms: number;
  stories: number;
  garage: number;
  /** square meters */
  area: number;
  /** indicative price in USD */
  price: number;
  rating: number;
  reviews: number;
  featured: boolean;
  hero: string;
  thumbnail: string;
  description: string;
  story: string[];
  gallery: GalleryItem[];
  videoTour: {
    /** youtube embed url */
    src: string;
    poster: string;
    title: string;
  };
  floorPlans: FloorPlan[];
  specifications: Specification[];
  exterior: string[];
  interiors: {
    kitchen: string;
    livingRoom: string;
    bedroom: string;
    bathroom: string;
    outdoor: string;
  };
  highlights: string[];
}

export interface View {
  view: "landing" | "browse" | "house" | "about" | "contact";
  houseSlug?: string;
  category?: CategorySlug;
}
