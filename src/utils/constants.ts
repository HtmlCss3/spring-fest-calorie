// 常量定义

export const CUSTOM_DISH_ID_OFFSET = 100000;
export const QUANTITY_STEP = 50;

export const CALORIE_THRESHOLDS = {
  HIGH: 3000,
  MODERATE: 2000,
} as const;

export const NUTRITION_THRESHOLDS = {
  MIN_PROTEIN: 30,
  MAX_MEAT_RATIO: 0.6,
} as const;

export const COLORS = [
  '#ef4444',
  '#3b82f6',
  '#f59e0b',
  '#10b981',
  '#8b5cf6',
  '#ec4899',
] as const;

export const STORAGE_KEY = 'spring-fest-calorie-data';