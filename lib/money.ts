export const clampQuantity = (value: number, stock: number) => Math.min(Math.max(Math.floor(Number.isFinite(value) ? value : 1), 1), Math.max(stock, 1));
export const percentOf = (amount: number, percent: number) => Math.round(amount * (percent / 100));
