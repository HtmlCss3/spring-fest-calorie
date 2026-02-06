import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { COLORS } from '../utils/constants';

interface CalorieOverviewProps {
  totalCalories: number;
  currentDate: string;
  chartData: Array<{ name: string; value: number }>;
  onSaveHistory: () => void;
}

const CalorieOverview: React.FC<CalorieOverviewProps> = ({ totalCalories, currentDate, chartData, onSaveHistory }) => {
  return (
    <div className="card overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-red-500 via-pink-500 to-orange-400"></div>
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <span className="text-2xl">📊</span> 热量总览
        </h2>
        <div className="mt-6 mb-4">
          <div className="relative inline-block">
            <span className="stat-value text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
              {Math.round(totalCalories)}
            </span>
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-400 rounded-full"></div>
          </div>
          <span className="stat-label block mt-2 text-gray-500">千卡</span>
        </div>
        <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
          <span className="text-red-500">📅</span>
          <span className="font-medium text-gray-700">{currentDate}</span>
        </div>
        <button
          onClick={onSaveHistory}
          className="mt-4 w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>💾</span> 保存记录
        </button>
      </div>
      {chartData.length > 0 && (
        <div className="px-6 pb-6">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                                      data={chartData}
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={50}
                                      outerRadius={70}
                                      paddingAngle={2}
                                      dataKey="value"
                                    >
                                      {chartData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                    </Pie>              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default React.memo(CalorieOverview);