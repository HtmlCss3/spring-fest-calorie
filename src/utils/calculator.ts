import type { Dish, CustomDish, SelectedDish } from '../data/dishes';
import { activityFactors } from '../data/dishes';

/**
 * 计算单个菜品的营养素
 */
export function calculateDishNutrition(
  dish: Dish | CustomDish,
  quantity: number
): { calories: number; protein: number; fat: number; carbs: number } {
  const ratio = quantity / 100;
  return {
    calories: Math.round(dish.calories * ratio),
    protein: Math.round(dish.protein * ratio),
    fat: Math.round(dish.fat * ratio),
    carbs: Math.round(dish.carbs * ratio),
  };
}

/**
 * 计算多个菜品的总营养素
 */
export function calculateTotalNutrition(
  selectedDishes: SelectedDish[],
  allDishes: (Dish | CustomDish)[]
): {
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
} {
  return selectedDishes.reduce(
    (acc, dish) => {
      const dishData = allDishes.find((d) => d.id === dish.id);
      if (!dishData) return acc;

      const nutrition = calculateDishNutrition(dishData, dish.quantity);
      return {
        totalCalories: acc.totalCalories + nutrition.calories,
        totalProtein: acc.totalProtein + nutrition.protein,
        totalFat: acc.totalFat + nutrition.fat,
        totalCarbs: acc.totalCarbs + nutrition.carbs,
      };
    },
    { totalCalories: 0, totalProtein: 0, totalFat: 0, totalCarbs: 0 }
  );
}

/**
 * 计算运动消耗时间
 */
export function calculateActivityTime(activity: string, calories: number): number {
  const factor = activityFactors[activity];
  return Math.round(calories / factor);
}