export function validateCustomDishName(name: string): boolean {
  return name.trim().length > 0 && name.length <= 50;
}

export function validateCalories(calories: string): boolean {
  const num = parseFloat(calories);
  return !isNaN(num) && num > 0 && num <= 2000;
}

export function validateNutrientValue(value: string): boolean {
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0 && num <= 200;
}

export function validatePortion(portion: number): boolean {
  return !isNaN(portion) && portion > 0 && portion <= 1000;
}

export function validateCustomDish(formData: {
  name: string;
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
  portion: number;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!validateCustomDishName(formData.name)) {
    errors.name = '菜品名称必须在1-50个字符之间';
  }

  if (!validateCalories(formData.calories)) {
    errors.calories = '热量必须在0-2000之间';
  }

  if (!validateNutrientValue(formData.protein)) {
    errors.protein = '蛋白质必须在0-200之间';
  }

  if (!validateNutrientValue(formData.fat)) {
    errors.fat = '脂肪必须在0-200之间';
  }

  if (!validateNutrientValue(formData.carbs)) {
    errors.carbs = '碳水化合物必须在0-200之间';
  }

  if (!validatePortion(formData.portion)) {
    errors.portion = '分量必须在1-1000之间';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}