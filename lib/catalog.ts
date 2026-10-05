import type { CollectionSlug, Product } from '@/lib/types';
import { PRODUCTS } from '@/data/catalog';

export interface CatalogFilters { query?: string; category?: string; finish?: string; availability?: string; min?: number; max?: number; sort?: string; collection?: CollectionSlug; }

export function filterProducts(filters: CatalogFilters, source = PRODUCTS) {
  const query = (filters.query ?? '').trim().toLowerCase();
  const products = source.filter((product) => {
    const variants = product.variants;
    const searchable = [product.name, product.category, product.description, ...product.tags, ...product.collections].join(' ').toLowerCase();
    const matchesQuery = !query || searchable.includes(query);
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesFinish = !filters.finish || variants.some((variant) => variant.finish === filters.finish);
    const matchesAvailability = !filters.availability || (filters.availability === 'in-stock' ? variants.some((variant) => variant.available) : variants.every((variant) => !variant.available));
    const prices = variants.map((variant) => variant.price);
    const matchesMin = filters.min === undefined || Math.min(...prices) >= filters.min * 100;
    const matchesMax = filters.max === undefined || Math.min(...prices) <= filters.max * 100;
    const matchesCollection = !filters.collection || product.collections.includes(filters.collection);
    return matchesQuery && matchesCategory && matchesFinish && matchesAvailability && matchesMin && matchesMax && matchesCollection;
  });
  return [...products].sort((a, b) => {
    if (filters.sort === 'price-asc') return Math.min(...a.variants.map((v) => v.price)) - Math.min(...b.variants.map((v) => v.price));
    if (filters.sort === 'price-desc') return Math.max(...b.variants.map((v) => v.price)) - Math.max(...a.variants.map((v) => v.price));
    if (filters.sort === 'name') return a.name.localeCompare(b.name);
    return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
  });
}

export function recommendProducts(use: CollectionSlug, priority: keyof Product['scores'], budget: number) {
  return PRODUCTS.filter((product) => product.collections.includes(use) && product.variants.some((variant) => variant.available && variant.price <= budget * 100))
    .map((product) => ({ product, score: product.scores[priority] + (product.featured ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
