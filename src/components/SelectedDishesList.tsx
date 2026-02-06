import React from 'react';
import { FaTrash, FaPlus, FaMinus, FaRunning, FaFire } from 'react-icons/fa';
import type { Dish, CustomDish, SelectedDish } from '../data/dishes';
import { activityFactors } from '../data/dishes';

interface SelectedDishesListProps {
  selectedDishes: SelectedDish[];
  allDishes: (Dish | CustomDish)[];
  totalCalories: number;
  onRemove: (dishId: number) => void;
  onUpdateQuantity: (dishId: number, delta: number) => void;
  onExport: (format: 'json' | 'csv') => void;
}

const SelectedDishesList: React.FC<SelectedDishesListProps> = ({
  selectedDishes,
  allDishes,
  totalCalories,
  onRemove,
  onUpdateQuantity,
  onExport,
}) => {
  const calculateActivityTime = (activity: string, calories: number): number => {
    const factor = activityFactors[activity];
    return Math.round(calories / factor);
  };

  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">🍴 已选菜品 ({selectedDishes.length})</h2>
        {selectedDishes.length > 0 && (
          <button onClick={() => selectedDishes.forEach((d) => onRemove(d.id))} className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
            清空
          </button>
        )}
      </div>
      <div className="p-4 max-h-96 overflow-y-auto">
        {selectedDishes.length === 0 ? (
          <p className="text-center text-gray-500 py-4">暂无已选菜品</p>
        ) : (
          <div className="space-y-3">
            {selectedDishes.map((selectedDish) => {
              const dishData = allDishes.find((d) => d.id === selectedDish.id);
              if (!dishData) return null;

              const dishCalories = Math.round(dishData.calories * (selectedDish.quantity / 100));

              return (
                <div key={selectedDish.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      {dishData.icon} {dishData.name}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      <FaFire className="text-red-500 inline mr-1" />
                      {dishCalories} 千卡 · {selectedDish.quantity}g
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(selectedDish.id, -50)}
                      className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="text-sm font-medium w-12 text-center">{selectedDish.quantity}g</span>
                    <button
                      onClick={() => onUpdateQuantity(selectedDish.id, 50)}
                      className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
                    >
                      <FaPlus size={12} />
                    </button>
                    <button
                      onClick={() => onRemove(selectedDish.id)}
                      className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded transition-colors ml-2"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 运动换算 */}
      {totalCalories > 0 && (
        <div className="border-t border-gray-200 p-4">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <FaRunning /> 运动消耗建议
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(activityFactors).map(([activity]) => (
              <div key={activity} className="text-center p-2 bg-blue-50 rounded-lg">
                <div className="text-xs text-gray-600">{activity}</div>
                <div className="font-semibold text-blue-600">{calculateActivityTime(activity, totalCalories)}分钟</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 导出按钮 */}
      {selectedDishes.length > 0 && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <button onClick={() => onExport('json')} className="flex-1 btn-secondary text-sm">
              导出 JSON
            </button>
            <button onClick={() => onExport('csv')} className="flex-1 btn-secondary text-sm">
              导出 CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(SelectedDishesList);