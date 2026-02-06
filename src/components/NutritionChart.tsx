import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { COLORS } from '../utils/constants';

interface NutritionChartProps {
  nutritionData: Array<{ name: string; value: number; color: string }>;
  chartData: Array<{ name: string; value: number }>;
}

const NutritionChart: React.FC<NutritionChartProps> = ({ nutritionData, chartData }) => {
  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
        <h2 className="text-lg font-semibold">🥗 营养素分析</h2>
      </div>
      <div className="p-6">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={nutritionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {chartData.length > 0 && (
        <div className="border-t border-gray-200 p-6">
          <h3 className="font-semibold text-gray-700 mb-4">热量分布</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} paddingAngle={2} dataKey="value" label>
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default React.memo(NutritionChart);