import { useCallback } from 'react';
import type { SelectedDish, Dish, CustomDish } from '../data/dishes';
import { exportFileName } from '../utils/formatters';

export interface ExportRecord {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  dishes: {
    name: string | undefined;
    quantity: number;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  }[];
}

export function useExport() {
  const handleExport = useCallback(
    (
      currentDate: string,
      selectedDishes: SelectedDish[],
      allDishes: (Dish | CustomDish)[],
      totalCalories: number,
      totalProtein: number,
      totalFat: number,
      totalCarbs: number,
      format: 'json' | 'csv'
    ) => {
      const record: ExportRecord = {
        date: currentDate,
        totalCalories: Math.round(totalCalories),
        totalProtein: Math.round(totalProtein),
        totalFat: Math.round(totalFat),
        totalCarbs: Math.round(totalCarbs),
        dishes: selectedDishes.map((d) => {
          const dishData = allDishes.find((dish) => dish.id === d.id);
return {
          name: dishData?.name,
          quantity: d.quantity,
          calories: Math.round((dishData?.calories || 0) * (d.quantity / 100)),
          protein: Math.round((dishData?.protein || 0) * (d.quantity / 100)),
          fat: Math.round((dishData?.fat || 0) * (d.quantity / 100)),
          carbs: Math.round((dishData?.carbs || 0) * (d.quantity / 100)),
        };
        }),
      };

      const filename = exportFileName(currentDate, format);

      if (format === 'json') {
        const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' });
        downloadBlob(blob, filename);
      } else if (format === 'csv') {
        let csv = '菜品名称,分量,热量(千卡),蛋白质,脂肪,碳水化合物\n';
        record.dishes.forEach((dish) => {
          csv += `${dish.name},${dish.quantity},${dish.calories},${dish.protein},${dish.fat},${dish.carbs}\n`;
        });
        csv += `\n总计,${record.dishes.reduce((sum, d) => sum + d.quantity, 0)},${record.totalCalories},${record.totalProtein},${record.totalFat},${record.totalCarbs}\n`;
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        downloadBlob(blob, filename);
      }
    },
    []
  );

  return { handleExport };
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}