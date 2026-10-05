export const STORE_CONFIG = {
  brand: 'ORVYN',
  currency: 'PKR',
  currencyLocale: 'en-PK',
  deliveryMinor: 50_000,
  freeDeliveryThresholdMinor: 2_000_000,
  couponCode: 'ORVYN10',
  couponPercent: 10,
  taxPercent: 0,
  note: 'Sample store rules for this frontend concept. Not a delivery or tax commitment.',
} as const;

export const formatPKR = (minor: number) =>
  new Intl.NumberFormat(STORE_CONFIG.currencyLocale, {
    style: 'currency',
    currency: STORE_CONFIG.currency,
    maximumFractionDigits: 0,
  }).format(Math.round(minor / 100));
