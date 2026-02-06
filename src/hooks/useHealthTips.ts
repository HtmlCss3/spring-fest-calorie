import { useMemo } from 'react';
import type { HealthTip } from '../types';
import type { Dish, CustomDish, SelectedDish } from '../data/dishes';
import { CALORIE_THRESHOLDS, NUTRITION_THRESHOLDS } from '../utils/constants';

export function useHealthTips(
  selectedDishes: SelectedDish[],
  customDishes: CustomDish[],
  baseDishes: Dish[],
  totalCalories: number,
  totalProtein: number
) {
  const tips = useMemo(() => {
    const allDishes = [...baseDishes, ...customDishes];
    const result: HealthTip[] = [];

    // 热量建议
    if (totalCalories > CALORIE_THRESHOLDS.HIGH) {
      result.push({
        type: 'warning',
        icon: '⚠️',
        text: '热量摄入较高，建议减少高热量菜品，增加蔬菜摄入',
      });
    } else if (totalCalories > CALORIE_THRESHOLDS.MODERATE) {
      result.push({
        type: 'info',
        icon: '💡',
        text: '热量适中，可以适当增加运动消耗',
      });
    } else if (totalCalories > 0) {
      result.push({
        type: 'success',
        icon: '✅',
        text: '热量控制得很好，继续保持！',
      });
    }

    // 荤素比例建议
    const meatCalories = selectedDishes
      .filter((d) => allDishes.find((dish) => dish.id === d.id)?.type === '荤菜')
      .reduce((sum, d) => {
        const dishData = allDishes.find((dish) => dish.id === d.id);
        return sum + (dishData ? dishData.calories * (d.quantity / 100) : 0);
      }, 0);

    if (meatCalories > totalCalories * NUTRITION_THRESHOLDS.MAX_MEAT_RATIO) {
      result.push({
        type: 'warning',
        icon: '🥬',
        text: '荤菜比例过高，建议增加素菜和汤品',
      });
    }

    // 蛋白质建议
    if (totalProtein < NUTRITION_THRESHOLDS.MIN_PROTEIN && totalCalories > 0) {
      result.push({
        type: 'info',
        icon: '🥚',
        text: '蛋白质摄入不足，建议增加肉类、蛋类或豆制品',
      });
    }

    return result;
  }, [selectedDishes, customDishes, baseDishes, totalCalories, totalProtein]);

  return { tips };
}