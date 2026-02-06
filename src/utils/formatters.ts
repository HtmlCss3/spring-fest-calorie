// 格式化工具函数
import type { Dish, CustomDish, ActivityFactors } from '../data/dishes';

export function formatDate(date: string): string {
  return date;
}

export function roundNumber(value: number): number {
  return Math.round(value);
}

export function calculateCalories(dish: Dish | CustomDish, quantity: number): number {
  return Math.round(dish.calories * (quantity / 100));
}

export function calculateActivityTime(activity: string, calories: number, activityFactors: ActivityFactors): number {
  const factor = activityFactors[activity];
  return Math.round(calories / factor);
}

export function formatShareText(
  currentDate: string,
  totalCalories: number,
  totalProtein: number,
  totalFat: number,
  totalCarbs: number,
  dishesText: string
): string {
  return `🧧 春节美食热量计算器 🧧\n\n📅 日期: ${currentDate}\n🔥 总热量: ${Math.round(totalCalories)} 千卡\n\n📊 营养素:\n• 蛋白质: ${Math.round(totalProtein)}g\n• 脂肪: ${Math.round(totalFat)}g\n• 碳水化合物: ${Math.round(totalCarbs)}g\n\n已选菜品:\n${dishesText}\n\n🧨 2026 马年春节快乐！`;
}

export function exportFileName(date: string, format: 'json' | 'csv'): string {
  return `calorie-report-${date}.${format}`;
}