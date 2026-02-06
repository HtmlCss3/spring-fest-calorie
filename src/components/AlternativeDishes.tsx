import React from 'react';
import type { Alternative } from '../types';

interface AlternativeDishesProps {
  alternatives: Alternative[];
}

const AlternativeDishes: React.FC<AlternativeDishesProps> = ({ alternatives }) => {
  if (alternatives.length === 0) return null;

  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4">
        <h2 className="text-lg font-semibold">🔄 低热量替代</h2>
      </div>
      <div className="p-4 space-y-3">
        {alternatives.map((alt, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-teal-50 rounded-lg border border-teal-100">
            <div>
              <div className="text-sm text-gray-600">{alt.original}</div>
              <div className="text-sm font-medium text-teal-700">→ {alt.alternative}</div>
            </div>
            <div className={`font-semibold ${alt.saved > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {alt.saved > 0 ? '-' : '+'}{Math.abs(Math.round(alt.saved))} 千卡
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(AlternativeDishes);