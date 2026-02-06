import { useMemo } from 'react';
import type { Dish, CustomDish, SelectedDish } from '../data/dishes';
import type { ChartData, NutritionData } from '../types';

export function useNutritionCalculation(
  selectedDishes: SelectedDish[],
  customDishes: CustomDish[],
  baseDishes: Dish[]
) {
  const { totalCalories, totalProtein, totalFat, totalCarbs } = useMemo(() => {
    const allDishes = [...baseDishes, ...customDishes];

    const totals = selectedDishes.reduce(
      (acc, dish) => {
        const dishData = allDishes.find((d) => d.id === dish.id);
        if (!dishData) return acc;

        const ratio = dish.quantity / 100;
        return {
          calories: acc.calories + dishData.calories * ratio,
          protein: acc.protein + dishData.protein * ratio,
          fat: acc.fat + dishData.fat * ratio,
          carbs: acc.carbs + dishData.carbs * ratio,
        };
      },
      { calories: 0, protein: 0, fat: 0, carbs: 0 }
    );

    return {
      totalCalories: totals.calories,
      totalProtein: totals.protein,
      totalFat: totals.fat,
      totalCarbs: totals.carbs,
    };
  }, [selectedDishes, customDishes, baseDishes]);

  const chartData: ChartData[] = useMemo(() => {
    const allDishes = [...baseDishes, ...customDishes];
    const typeData: Record<string, number> = {};

    selectedDishes.forEach((dish) => {
      const dishData = allDishes.find((d) => d.id === dish.id);
      if (dishData) {
        const calories = dishData.calories * (dish.quantity / 100);
        typeData[dishData.type] = (typeData[dishData.type] || 0) + calories;
      }
    });

    return Object.entries(typeData).map(([type, calories]) => ({
      name: type,
      value: Math.round(calories),
    }));
  }, [selectedDishes, customDishes, baseDishes]);

  const nutritionData: NutritionData[] = useMemo(
    () => [
      { name: '蛋白质', value: Math.round(totalProtein), color: '#36A2EB' },
      { name: '脂肪', value: Math.round(totalFat), color: '#FF6384' },
      { name: '碳水化合物', value: Math.round(totalCarbs), color: '#FFCE56' },
    ],
    [totalProtein, totalFat, totalCarbs]
  );

  return {
    totalCalories,
    totalProtein,
    totalFat,
    totalCarbs,
    chartData,
    nutritionData,
  };
}