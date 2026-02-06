// 从 dishes.ts 重新导出所有类型和常量
export * from '../data/dishes';

// ===== 新的数据结构设计 =====

// 单个日期的完整数据
export interface DailyData {
  date: string; // YYYY-MM-DD 格式
  selectedDishes: import('../data/dishes').SelectedDish[];
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  customDishes: import('../data/dishes').CustomDish[]; // 每天的自定义菜品（可选，也可以全局共享）
  savedToHistory: boolean; // 是否已保存到历史记录
  lastModified: string; // 最后修改时间
}

// 应用主数据结构
export interface CalorieAppData {
  dailyRecords: Record<string, DailyData>; // 按日期索引的记录
  customDishes: import('../data/dishes').CustomDish[]; // 全局共享的自定义菜品
  preferences: UserPreferences; // 用户偏好设置
}

// 用户偏好设置
export interface UserPreferences {
  defaultCuisine: string;
  defaultType: string;
  enableNotifications: boolean;
}

// 辅助类型
export type HealthTipType = 'warning' | 'success' | 'info';

export interface HealthTip {
  type: HealthTipType;
  icon: string;
  text: string;
}

export interface Alternative {
  original: string;
  alternative: string;
  saved: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface NutritionData {
  name: string;
  value: number;
  color: string;
}

// ===== 辅助函数 =====

export function createEmptyAppData(): CalorieAppData {
  return {
    dailyRecords: {},
    customDishes: [],
    preferences: {
      defaultCuisine: '全部',
      defaultType: '全部',
      enableNotifications: false,
    },
  };
}

export function createEmptyDailyData(date: string): DailyData {
  return {
    date,
    selectedDishes: [],
    totalCalories: 0,
    totalProtein: 0,
    totalFat: 0,
    totalCarbs: 0,
    customDishes: [],
    savedToHistory: false,
    lastModified: new Date().toISOString(),
  };
}

export function updateDailyData(appData: CalorieAppData, date: string, dailyData: DailyData): CalorieAppData {
  return {
    ...appData,
    dailyRecords: {
      ...appData.dailyRecords,
      [date]: {
        ...dailyData,
        lastModified: new Date().toISOString(),
      },
    },
  };
}

// 获取或创建日期数据
export function getOrCreateDailyData(appData: CalorieAppData, date: string): DailyData {
  return appData.dailyRecords[date] || createEmptyDailyData(date);
}

// 合并自定义菜品（全局 + 当天）
export function getAllCustomDishesForDate(appData: CalorieAppData, date: string): import('../data/dishes').CustomDish[] {
  const dailyData = appData.dailyRecords[date];
  const globalCustomDishes = appData.customDishes || [];
  const dailyCustomDishes = dailyData?.customDishes || [];
  
  // 去重合并
  const dishMap = new Map<number, import('../data/dishes').CustomDish>();
  [...globalCustomDishes, ...dailyCustomDishes].forEach(dish => {
    dishMap.set(dish.id, dish);
  });
  
  return Array.from(dishMap.values());
}

// 生成历史记录列表（用于显示）
export function generateHistoryList(appData: CalorieAppData): import('../data/dishes').HistoryRecord[] {
  return Object.values(appData.dailyRecords)
    .filter(record => record.savedToHistory)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(record => ({
      date: record.date,
      dishes: record.selectedDishes,
      totalCalories: Math.round(record.totalCalories),
      totalProtein: Math.round(record.totalProtein),
      totalFat: Math.round(record.totalFat),
      totalCarbs: Math.round(record.totalCarbs),
    }));
}