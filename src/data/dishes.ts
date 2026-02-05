export interface Dish {
  id: number;
  name: string;
  calories: number;
  cuisine: string;
  type: string;
  portion: number;
  icon: string;
  protein: number;
  fat: number;
  carbs: number;
}

export interface SelectedDish {
  id: number;
  quantity: number;
}

export interface CustomDish extends Dish {
  custom?: boolean;
}

export interface AlternativeDish {
  name: string;
  calorieDiff: number;
}

export interface AlternativeDishes {
  [key: string]: AlternativeDish;
}

export interface ActivityFactors {
  [key: string]: number;
}

export interface HistoryRecord {
  date: string;
  dishes: SelectedDish[];
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
}

export const dishes: Dish[] = [
  // 荤菜
  { id: 1, name: '红烧肉', calories: 320, cuisine: '本帮菜', type: '荤菜', portion: 150, icon: '🥩', protein: 18, fat: 24, carbs: 3 },
  { id: 2, name: '糖醋排骨', calories: 280, cuisine: '本帮菜', type: '荤菜', portion: 150, icon: '🍖', protein: 20, fat: 18, carbs: 12 },
  { id: 3, name: '清蒸鲈鱼', calories: 110, cuisine: '粤菜', type: '荤菜', portion: 200, icon: '🐟', protein: 20, fat: 2, carbs: 0 },
  { id: 4, name: '红烧鱼', calories: 180, cuisine: '本帮菜', type: '荤菜', portion: 150, icon: '🐟', protein: 22, fat: 8, carbs: 5 },
  { id: 5, name: '宫保鸡丁', calories: 160, cuisine: '川菜', type: '荤菜', portion: 150, icon: '🍗', protein: 18, fat: 8, carbs: 10 },
  { id: 6, name: '口水鸡', calories: 140, cuisine: '川菜', type: '荤菜', portion: 150, icon: '🍗', protein: 20, fat: 6, carbs: 5 },
  { id: 7, name: '白切鸡', calories: 120, cuisine: '粤菜', type: '荤菜', portion: 150, icon: '🍗', protein: 22, fat: 3, carbs: 0 },
  { id: 8, name: '北京烤鸭', calories: 240, cuisine: '鲁菜', type: '荤菜', portion: 100, icon: '🦆', protein: 16, fat: 18, carbs: 2 },
  { id: 9, name: '梅菜扣肉', calories: 350, cuisine: '粤菜', type: '荤菜', portion: 150, icon: '🥓', protein: 15, fat: 30, carbs: 8 },
  { id: 10, name: '红烧狮子头', calories: 280, cuisine: '淮扬菜', type: '荤菜', portion: 150, icon: '🍖', protein: 18, fat: 20, carbs: 8 },
  { id: 11, name: '水煮鱼', calories: 200, cuisine: '川菜', type: '荤菜', portion: 150, icon: '🐟', protein: 18, fat: 12, carbs: 8 },
  { id: 12, name: '麻婆豆腐', calories: 120, cuisine: '川菜', type: '荤菜', portion: 150, icon: '🍲', protein: 10, fat: 8, carbs: 6 },
  { id: 13, name: '回锅肉', calories: 300, cuisine: '川菜', type: '荤菜', portion: 150, icon: '🥩', protein: 18, fat: 24, carbs: 5 },
  { id: 14, name: '酸菜鱼', calories: 140, cuisine: '川菜', type: '荤菜', portion: 150, icon: '🐟', protein: 16, fat: 6, carbs: 8 },
  { id: 15, name: '东坡肉', calories: 340, cuisine: '浙菜', type: '荤菜', portion: 150, icon: '🥩', protein: 16, fat: 28, carbs: 5 },
  { id: 16, name: '蒜蓉扇贝', calories: 100, cuisine: '粤菜', type: '荤菜', portion: 100, icon: '🦪', protein: 16, fat: 2, carbs: 6 },
  { id: 17, name: '清蒸大闸蟹', calories: 90, cuisine: '苏菜', type: '荤菜', portion: 100, icon: '🦀', protein: 16, fat: 2, carbs: 2 },
  { id: 18, name: '红烧猪蹄', calories: 380, cuisine: '本帮菜', type: '荤菜', portion: 150, icon: '🍖', protein: 16, fat: 32, carbs: 5 },
  { id: 19, name: '香酥鸭', calories: 260, cuisine: '粤菜', type: '荤菜', portion: 150, icon: '🦆', protein: 18, fat: 20, carbs: 4 },
  { id: 20, name: '红烧牛肉', calories: 180, cuisine: '川菜', type: '荤菜', portion: 150, icon: '🥩', protein: 22, fat: 10, carbs: 5 },

  // 素菜
  { id: 21, name: '蒜蓉西兰花', calories: 35, cuisine: '粤菜', type: '素菜', portion: 150, icon: '🥦', protein: 3, fat: 0.5, carbs: 7 },
  { id: 22, name: '干煸四季豆', calories: 60, cuisine: '川菜', type: '素菜', portion: 150, icon: '🫘', protein: 3, fat: 3, carbs: 8 },
  { id: 23, name: '麻婆豆腐（素）', calories: 90, cuisine: '川菜', type: '素菜', portion: 150, icon: '🍲', protein: 6, fat: 6, carbs: 6 },
  { id: 24, name: '酸辣土豆丝', calories: 70, cuisine: '川菜', type: '素菜', portion: 150, icon: '🥔', protein: 2, fat: 3, carbs: 12 },
  { id: 25, name: '香菇青菜', calories: 40, cuisine: '本帮菜', type: '素菜', portion: 150, icon: '🍄', protein: 3, fat: 1, carbs: 7 },
  { id: 26, name: '红烧茄子', calories: 80, cuisine: '本帮菜', type: '素菜', portion: 150, icon: '🍆', protein: 2, fat: 5, carbs: 9 },
  { id: 27, name: '蚝油生菜', calories: 35, cuisine: '粤菜', type: '素菜', portion: 150, icon: '🥬', protein: 2, fat: 1, carbs: 6 },
  { id: 28, name: '上汤娃娃菜', calories: 50, cuisine: '粤菜', type: '素菜', portion: 150, icon: '🥬', protein: 3, fat: 2, carbs: 7 },
  { id: 29, name: '地三鲜', calories: 90, cuisine: '东北菜', type: '素菜', portion: 150, icon: '🍆', protein: 3, fat: 5, carbs: 10 },
  { id: 30, name: '凉拌黄瓜', calories: 20, cuisine: '川菜', type: '素菜', portion: 150, icon: '🥒', protein: 1, fat: 0.5, carbs: 4 },
  { id: 31, name: '松仁玉米', calories: 95, cuisine: '东北菜', type: '素菜', portion: 150, icon: '🌽', protein: 4, fat: 4, carbs: 12 },
  { id: 32, name: '糖醋藕片', calories: 60, cuisine: '本帮菜', type: '素菜', portion: 150, icon: '🌾', protein: 2, fat: 0.5, carbs: 14 },
  { id: 33, name: '拍黄瓜', calories: 18, cuisine: '川菜', type: '素菜', portion: 150, icon: '🥒', protein: 1, fat: 0.5, carbs: 4 },
  { id: 34, name: '蒜蓉油麦菜', calories: 28, cuisine: '粤菜', type: '素菜', portion: 150, icon: '🥬', protein: 2, fat: 0.5, carbs: 5 },
  { id: 35, name: '凉拌木耳', calories: 30, cuisine: '东北菜', type: '素菜', portion: 150, icon: '🍄', protein: 2, fat: 0.5, carbs: 6 },

  // 汤品
  { id: 36, name: '西红柿鸡蛋汤', calories: 40, cuisine: '家常菜', type: '汤品', portion: 200, icon: '🥣', protein: 3, fat: 2, carbs: 4 },
  { id: 37, name: '排骨汤', calories: 100, cuisine: '家常菜', type: '汤品', portion: 200, icon: '🍲', protein: 8, fat: 6, carbs: 4 },
  { id: 38, name: '鸡汤', calories: 80, cuisine: '家常菜', type: '汤品', portion: 200, icon: '🥣', protein: 8, fat: 4, carbs: 2 },
  { id: 39, name: '冬瓜丸子汤', calories: 60, cuisine: '家常菜', type: '汤品', portion: 200, icon: '🥣', protein: 6, fat: 3, carbs: 4 },
  { id: 40, name: '鲫鱼豆腐汤', calories: 70, cuisine: '粤菜', type: '汤品', portion: 200, icon: '🐟', protein: 10, fat: 3, carbs: 3 },
  { id: 41, name: '羊肉汤', calories: 140, cuisine: '西北菜', type: '汤品', portion: 200, icon: '🥣', protein: 10, fat: 8, carbs: 5 },
  { id: 42, name: '菌菇汤', calories: 45, cuisine: '粤菜', type: '汤品', portion: 200, icon: '🍄', protein: 3, fat: 2, carbs: 5 },
  { id: 43, name: '紫菜蛋花汤', calories: 35, cuisine: '家常菜', type: '汤品', portion: 200, icon: '🥣', protein: 3, fat: 1, carbs: 4 },
  { id: 44, name: '酸菜白肉汤', calories: 110, cuisine: '东北菜', type: '汤品', portion: 200, icon: '🥣', protein: 8, fat: 6, carbs: 8 },
  { id: 45, name: '花胶鸡汤', calories: 85, cuisine: '粤菜', type: '汤品', portion: 200, icon: '🐔', protein: 12, fat: 3, carbs: 2 },

  // 主食
  { id: 46, name: '饺子', calories: 180, cuisine: '北方菜', type: '主食', portion: 200, icon: '🥟', protein: 8, fat: 6, carbs: 28 },
  { id: 47, name: '红烧肉面', calories: 350, cuisine: '本帮菜', type: '主食', portion: 200, icon: '🍜', protein: 12, fat: 12, carbs: 48 },
  { id: 48, name: '炒年糕', calories: 250, cuisine: '家常菜', type: '主食', portion: 200, icon: '🍚', protein: 6, fat: 8, carbs: 42 },
  { id: 49, name: '扬州炒饭', calories: 280, cuisine: '淮扬菜', type: '主食', portion: 200, icon: '🍚', protein: 10, fat: 10, carbs: 40 },
  { id: 50, name: '牛肉面', calories: 300, cuisine: '川菜', type: '主食', portion: 200, icon: '🍜', protein: 14, fat: 10, carbs: 42 },
  { id: 51, name: '油泼面', calories: 350, cuisine: '西北菜', type: '主食', portion: 200, icon: '🍜', protein: 12, fat: 14, carbs: 48 },
  { id: 52, name: '小笼包', calories: 160, cuisine: '苏菜', type: '主食', portion: 150, icon: '🥟', protein: 6, fat: 6, carbs: 24 },
  { id: 53, name: '白米饭', calories: 150, cuisine: '家常菜', type: '主食', portion: 150, icon: '🍚', protein: 3, fat: 0.5, carbs: 34 },
  { id: 54, name: '八宝饭', calories: 220, cuisine: '江南菜', type: '主食', portion: 150, icon: '🍚', protein: 4, fat: 4, carbs: 44 },
  { id: 55, name: '汤圆', calories: 120, cuisine: '江南菜', type: '主食', portion: 150, icon: '🥟', protein: 3, fat: 2, carbs: 24 },

  // 点心
  { id: 56, name: '春卷', calories: 200, cuisine: '本帮菜', type: '点心', portion: 100, icon: '🌯', protein: 4, fat: 10, carbs: 24 },
  { id: 57, name: '炸鸡排', calories: 280, cuisine: '台湾菜', type: '点心', portion: 100, icon: '🍗', protein: 18, fat: 16, carbs: 14 },
  { id: 58, name: '蛋挞', calories: 180, cuisine: '粤菜', type: '点心', portion: 50, icon: '🥧', protein: 4, fat: 10, carbs: 18 },
  { id: 59, name: '麻团', calories: 320, cuisine: '粤菜', type: '点心', portion: 80, icon: '🍩', protein: 4, fat: 16, carbs: 38 },
  { id: 60, name: '炸丸子', calories: 260, cuisine: '北方菜', type: '点心', portion: 100, icon: '🍖', protein: 12, fat: 14, carbs: 18 },
  { id: 61, name: '糖油粑粑', calories: 280, cuisine: '湖南菜', type: '点心', portion: 100, icon: '🍡', protein: 4, fat: 12, carbs: 36 },
  { id: 62, name: '炸鸡翅', calories: 240, cuisine: '粤菜', type: '点心', portion: 100, icon: '🍗', protein: 16, fat: 14, carbs: 12 },
  { id: 63, name: '炸鱼排', calories: 220, cuisine: '粤菜', type: '点心', portion: 100, icon: '🐟', protein: 16, fat: 12, carbs: 10 },
  { id: 64, name: '炸薯条', calories: 320, cuisine: '西式', type: '点心', portion: 100, icon: '🍟', protein: 4, fat: 16, carbs: 40 },
  { id: 65, name: '炸鸡块', calories: 290, cuisine: '西式', type: '点心', portion: 100, icon: '🍗', protein: 16, fat: 16, carbs: 18 },
];

export const cuisines: string[] = ['全部', '本帮菜', '川菜', '粤菜', '东北菜', '鲁菜', '淮扬菜', '浙菜', '苏菜', '西北菜', '家常菜', '北方菜', '江南菜', '台湾菜', '湖南菜', '西式', '自定义'];

export const dishTypes: string[] = ['全部', '荤菜', '素菜', '汤品', '主食', '点心'];

export const activityFactors: ActivityFactors = {
  '跑步': 0.1,
  '步行': 0.05,
  '游泳': 0.08,
  '骑行': 0.06,
  '跳绳': 0.12,
  '瑜伽': 0.03,
  '跳操': 0.07,
  '爬山': 0.08,
};

export const alternativeDishes: AlternativeDishes = {
  '红烧肉': { name: '清蒸鲈鱼', calorieDiff: -210 },
  '糖醋排骨': { name: '口水鸡', calorieDiff: -140 },
  '红烧狮子头': { name: '白切鸡', calorieDiff: -160 },
  '梅菜扣肉': { name: '清蒸大闸蟹', calorieDiff: -260 },
  '东坡肉': { name: '清蒸鲈鱼', calorieDiff: -230 },
  '红烧猪蹄': { name: '香酥鸭', calorieDiff: -120 },
  '红烧肉面': { name: '扬州炒饭', calorieDiff: -70 },
  '炒年糕': { name: '饺子', calorieDiff: -70 },
  '麻团': { name: '蛋挞', calorieDiff: -140 },
  '炸丸子': { name: '春卷', calorieDiff: -60 },
};