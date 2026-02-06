import { useMemo } from 'react';
import type { Alternative } from '../types';
import type { Dish, CustomDish, SelectedDish } from '../data/dishes';
import { alternativeDishes } from '../data/dishes';

export function useAlternatives(
  selectedDishes: SelectedDish[],
  customDishes: CustomDish[],
  baseDishes: Dish[]
) {
  const alternatives = useMemo(() => {
    const allDishes = [...baseDishes, ...customDishes];
    const result: Alternative[] = [];

    selectedDishes.forEach((dish) => {
      const dishData = allDishes.find((d) => d.id === dish.id);
      if (dishData && alternativeDishes[dishData.name]) {
        result.push({
          original: dishData.name,
          alternative: alternativeDishes[dishData.name].name,
          saved: alternativeDishes[dishData.name].calorieDiff * (dish.quantity / 100),
        });
      }
    });

    return result;
  }, [selectedDishes, customDishes, baseDishes]);

  return { alternatives };
}