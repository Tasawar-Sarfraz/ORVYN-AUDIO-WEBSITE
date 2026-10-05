export type CollectionSlug = 'focus' | 'move' | 'unwind';
export type ProductCategory = 'Audio' | 'Desk tech' | 'Everyday carry';
export type FinishTone = 'ink' | 'stone' | 'signal' | 'oxide' | 'mist';

export interface ProductVariant {
  id: string;
  finish: string;
  tone: FinishTone;
  price: number;
  stock: number;
  imageKey: string;
  material: string;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  eyebrow: string;
  description: string;
  collections: CollectionSlug[];
  tags: string[];
  featured?: boolean;
  edition: string;
  imageAlt: string;
  specs: Record<string, string>;
  scores: { compactness: number; comfort: number; performance: number };
  variants: ProductVariant[];
}

export interface CartLine {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface CartSnapshotLine extends CartLine {
  productName: string;
  variantName: string;
  unitPrice: number;
  lineTotal: number;
  imageKey: string;
}

export interface Totals {
  merchandiseSubtotal: number;
  discount: number;
  discountedSubtotal: number;
  delivery: number;
  tax: number;
  total: number;
  couponCode: string;
  couponValid: boolean;
  freeDelivery: boolean;
}

export interface DemoPreview {
  reference: string;
  createdAt: string;
  lines: CartSnapshotLine[];
  totals: Totals;
}
