import React from 'react';
import type { HealthTip } from '../types';

interface HealthTipsProps {
  tips: HealthTip[];
}

const HealthTips: React.FC<HealthTipsProps> = ({ tips }) => {
  if (tips.length === 0) return null;

  const getTipClass = (type: HealthTip['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4">
        <h2 className="text-lg font-semibold">💡 健康建议</h2>
      </div>
      <div className="p-4 space-y-3">
        {tips.map((tip, index) => (
          <div key={index} className={`p-4 rounded-lg border ${getTipClass(tip.type)}`}>
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{tip.icon}</span>
              <p className="text-sm">{tip.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(HealthTips);