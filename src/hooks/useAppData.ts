// 应用数据管理 Hook - 重新设计以支持日期关联数据
import { useState, useCallback, useMemo } from 'react';
import type {
  CalorieAppData,
  DailyData,
  SelectedDish,
  CustomDish,
} from '../types';
import {
  createEmptyAppData,
  updateDailyData,
  getOrCreateDailyData,
  getAllCustomDishesForDate,
  generateHistoryList,
} from '../types';
import { STORAGE_KEY } from '../utils/constants';
import { calculateTotalNutrition } from '../utils/calculator';
import { dishes } from '../data/dishes';

export function useAppData() {
  const [appData, setAppData] = useState<CalorieAppData>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      console.log('从 localStorage 读取数据:', STORAGE_KEY, item ? `找到数据 (${item.length} 字节)` : '无数据');

      if (!item || item.trim() === '' || item === 'undefined' || item === 'null') {
        console.log('存储数据为空或无效，使用默认数据');
        return createEmptyAppData();
      }

      const data = JSON.parse(item) as CalorieAppData;
      console.log('解析后的数据:', data);

      // 确保数据结构完整
      if (!data.dailyRecords) {
        data.dailyRecords = {};
      }
      if (!data.customDishes) {
        data.customDishes = [];
      }
      if (!data.preferences) {
        data.preferences = {
          defaultCuisine: '全部',
          defaultType: '全部',
          enableNotifications: false,
        };
      }

      return data;
    } catch (e) {
      console.error('读取应用数据失败:', e);
      console.log('清除无效数据并使用默认数据');
      localStorage.removeItem(STORAGE_KEY); // 清除损坏的数据
      return createEmptyAppData();
    }
  });

  const [currentDate, setCurrentDate] = useState<string>(() => new Date().toISOString().split('T')[0]);

  // 自动保存到 localStorage
  const saveAppData = useCallback((newDataOrFn: CalorieAppData | ((prev: CalorieAppData) => CalorieAppData)) => {
    setAppData((prev) => {
      // 先计算新数据（处理函数式更新）
      const newData = typeof newDataOrFn === 'function' ? newDataOrFn(prev) : newDataOrFn;

      // 验证数据有效性
      if (!newData || typeof newData !== 'object') {
        console.error('尝试保存无效数据:', newData);
        return prev; // 返回旧数据，不更新
      }

      // 序列化并保存
      const dataToSave = JSON.stringify(newData);
      localStorage.setItem(STORAGE_KEY, dataToSave);
      console.log('✅ 数据已保存到 localStorage:', STORAGE_KEY, '大小:', dataToSave.length, '字节');

      return newData; // 返回新数据，更新状态
    });
  }, []);

  // 获取当前日期的完整数据
  const currentDailyData = useMemo(() => {
    return getOrCreateDailyData(appData, currentDate);
  }, [appData, currentDate]);

  // 获取当前日期可用的所有自定义菜品（全局 + 当天）
  const currentCustomDishes = useMemo(() => {
    return getAllCustomDishesForDate(appData, currentDate);
  }, [appData, currentDate]);

  // 生成历史记录列表
  const historyList = useMemo(() => {
    return generateHistoryList(appData);
  }, [appData]);

  // 切换日期
  const changeDate = useCallback(
    (date: string) => {
      setCurrentDate(date);
    },
    []
  );

  // 添加菜品到当前日期
  const addDishToCurrentDate = useCallback(
    (dish: SelectedDish) => {
      saveAppData((prev) => {
        const dailyData = getOrCreateDailyData(prev, currentDate);
        const existingIndex = dailyData.selectedDishes.findIndex((d) => d.id === dish.id);
        let newSelectedDishes;

        if (existingIndex >= 0) {
          // 菜品已存在，增加数量
          newSelectedDishes = dailyData.selectedDishes.map((d, idx) =>
            idx === existingIndex ? { ...d, quantity: d.quantity + dish.quantity } : d
          );
        } else {
          // 新菜品
          newSelectedDishes = [...dailyData.selectedDishes, dish];
        }

        const allDishes = [...dishes, ...dailyData.customDishes];
        const { totalCalories, totalProtein, totalFat, totalCarbs } = calculateTotalNutrition(
          newSelectedDishes,
          allDishes
        );

        const updatedDailyData: DailyData = {
          ...dailyData,
          selectedDishes: newSelectedDishes,
          totalCalories,
          totalProtein,
          totalFat,
          totalCarbs,
          lastModified: new Date().toISOString(),
        };

        return updateDailyData(prev, currentDate, updatedDailyData);
      });
    },
    [currentDate, saveAppData]
  );

  // 从当前日期移除菜品
  const removeDishFromCurrentDate = useCallback(
    (dishId: number) => {
      saveAppData((prev) => {
        const dailyData = getOrCreateDailyData(prev, currentDate);
        const newSelectedDishes = dailyData.selectedDishes.filter((d) => d.id !== dishId);

        const allDishes = [...dishes, ...dailyData.customDishes];
        const { totalCalories, totalProtein, totalFat, totalCarbs } = calculateTotalNutrition(
          newSelectedDishes,
          allDishes
        );

        const updatedDailyData: DailyData = {
          ...dailyData,
          selectedDishes: newSelectedDishes,
          totalCalories,
          totalProtein,
          totalFat,
          totalCarbs,
          lastModified: new Date().toISOString(),
        };

        return updateDailyData(prev, currentDate, updatedDailyData);
      });
    },
    [currentDate, saveAppData]
  );

  // 更新菜品数量
  const updateDishQuantity = useCallback(
    (dishId: number, delta: number) => {
      saveAppData((prev) => {
        const dailyData = getOrCreateDailyData(prev, currentDate);
        const newSelectedDishes = dailyData.selectedDishes.map((d) =>
          d.id === dishId ? { ...d, quantity: Math.max(0, d.quantity + delta) } : d
        ).filter((d) => d.quantity > 0);

        const allDishes = [...dishes, ...dailyData.customDishes];
        const { totalCalories, totalProtein, totalFat, totalCarbs } = calculateTotalNutrition(
          newSelectedDishes,
          allDishes
        );

        const updatedDailyData: DailyData = {
          ...dailyData,
          selectedDishes: newSelectedDishes,
          totalCalories,
          totalProtein,
          totalFat,
          totalCarbs,
          lastModified: new Date().toISOString(),
        };

        return updateDailyData(prev, currentDate, updatedDailyData);
      });
    },
    [currentDate, saveAppData]
  );

  // 添加每日自定义菜品
  const addDailyCustomDish = useCallback(
    (dish: CustomDish) => {
      saveAppData((prev) => {
        const dailyData = getOrCreateDailyData(prev, currentDate);
        const updatedDailyData: DailyData = {
          ...dailyData,
          customDishes: [...dailyData.customDishes, dish],
          lastModified: new Date().toISOString(),
        };

        return updateDailyData(prev, currentDate, updatedDailyData);
      });
    },
    [currentDate, saveAppData]
  );

  // 保存当前日期到历史记录
  const saveCurrentDateToHistory = useCallback(() => {
    saveAppData((prev) => {
      const dailyData = getOrCreateDailyData(prev, currentDate);
      const updatedDailyData: DailyData = {
        ...dailyData,
        savedToHistory: true,
        lastModified: new Date().toISOString(),
      };

      return updateDailyData(prev, currentDate, updatedDailyData);
    });
  }, [currentDate, saveAppData]);

  // 从历史记录加载
  const loadFromHistory = useCallback(
    (date: string) => {
      const record = Object.values(appData.dailyRecords).find((r) => r.date === date && r.savedToHistory);
      if (record) {
        const updatedDailyData: DailyData = {
          ...record,
          lastModified: new Date().toISOString(),
        };

        saveAppData((prev) => updateDailyData(prev, date, updatedDailyData));
        setCurrentDate(date);
      }
    },
    [appData.dailyRecords, saveAppData]
  );

  return {
    appData,
    currentDate,
    setCurrentDate,
    currentDailyData,
    currentCustomDishes,
    historyList,
    changeDate,
    addDishToCurrentDate,
    removeDishFromCurrentDate,
    updateDishQuantity,
    addDailyCustomDish,
    saveCurrentDateToHistory,
    loadFromHistory,
  };
}