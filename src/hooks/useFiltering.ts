import { useMemo } from 'react';
import type { Dish, CustomDish } from '../data/dishes';

export function useFiltering(
  baseDishes: Dish[],
  customDishes: CustomDish[],
  selectedCuisine: string,
  selectedType: string
) {
  const filteredDishes = useMemo(() => {
    const allDishes = [...baseDishes, ...customDishes];
    return allDishes.filter((dish) => {
      const cuisineMatch = selectedCuisine === '全部' || dish.cuisine === selectedCuisine;
      const typeMatch = selectedType === '全部' || dish.type === selectedType;
      return cuisineMatch && typeMatch;
    });
  }, [baseDishes, customDishes, selectedCuisine, selectedType]);

  return { filteredDishes };
}