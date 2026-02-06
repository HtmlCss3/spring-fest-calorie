import React from 'react';
import { FaTrash, FaPlus, FaMinus, FaFire } from 'react-icons/fa';
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
      <div className="bg-gradient-to-r from-red-600 via-pink-500 to-orange-400 text-white p-4 flex items-center justify-between shadow-[0_4px_15px_rgba(220,38,38,0.3)]">
        <h2 className="text-lg font-semibold">🍴 已选菜品 ({selectedDishes.length})</h2>
        {selectedDishes.length > 0 && (
          <button
            onClick={() => selectedDishes.forEach((d) => onRemove(d.id))}
            className="text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-all duration-200 hover:shadow-md"
          >
            清空
          </button>
        )}
      </div>
      <div className="p-4 max-h-96 overflow-y-auto bg-gradient-to-b from-red-50/30 to-orange-50/30">
        {selectedDishes.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🥘</div>
            <p className="text-gray-500">暂无已选菜品</p>
            <p className="text-sm text-gray-400 mt-1">从左侧添加美食吧！</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedDishes.map((selectedDish) => {
              const dishData = allDishes.find((d) => d.id === selectedDish.id);
              if (!dishData) return null;

              const dishCalories = Math.round(dishData.calories * (selectedDish.quantity / 100));

              return (
                <div
                  key={selectedDish.id}
                  className="selected-item border border-red-100/50 bg-gradient-to-r from-white to-red-50/40"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 text-base">
                      {dishData.icon} {dishData.name}
                    </div>
                    <div className="text-sm text-gray-600 mt-1.5 flex items-center gap-2">
                      <span className="flex items-center gap-1 bg-gradient-to-r from-orange-100 to-red-100 px-2 py-0.5 rounded-full text-orange-600 font-medium">
                        <FaFire className="text-orange-500" size={10} />
                        {dishCalories} 千卡
                      </span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-500">{selectedDish.quantity}g</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onUpdateQuantity(selectedDish.id, -50)}
                      className="btn-control"
                      aria-label="减少"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="text-sm font-bold w-12 text-center text-gray-700">
                      {selectedDish.quantity}g
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(selectedDish.id, 50)}
                      className="btn-control"
                      aria-label="增加"
                    >
                      <FaPlus size={12} />
                    </button>
                    <button
                      onClick={() => onRemove(selectedDish.id)}
                      className="btn-remove ml-1"
                      aria-label="删除"
                    >
                      <FaTrash size={11} />
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
        <div className="border-t border-red-100 bg-gradient-to-r from-green-50/50 to-emerald-50/50 p-4">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2 text-base">
            <span className="text-green-600 text-xl">🏃</span> 运动消耗建议
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(activityFactors).map(([activity]) => (
              <div
                key={activity}
                className="text-center p-2.5 bg-white/80 rounded-xl border border-green-100 hover:border-green-200 transition-all duration-200 hover:shadow-md"
              >
                <div className="text-xs text-gray-600 font-medium mb-0.5">{activity}</div>
                <div className="font-bold text-green-600 text-base">
                  {calculateActivityTime(activity, totalCalories)}
                  <span className="text-xs font-normal text-gray-500 ml-0.5">分钟</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 导出按钮 */}
      {selectedDishes.length > 0 && (
        <div className="border-t border-red-100 p-4 bg-gradient-to-r from-red-50/30 to-orange-50/30">
          <div className="flex gap-2">
            <button
              onClick={() => onExport('json')}
              className="flex-1 btn-secondary text-sm border-red-200 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
            >
              📄 导出 JSON
            </button>
            <button
              onClick={() => onExport('csv')}
              className="flex-1 btn-secondary text-sm border-orange-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
            >
              📊 导出 CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(SelectedDishesList);
