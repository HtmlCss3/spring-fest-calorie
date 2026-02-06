import React from 'react';
import { FaCalendarAlt, FaTimes, FaFire } from 'react-icons/fa';
import type { HistoryRecord } from '../data/dishes';

interface HistoryModalProps {
  isOpen: boolean;
  history: HistoryRecord[];
  onLoad: (date: string) => void;
  onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, history, onLoad, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden animate-scale-in">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FaCalendarAlt /> 历史记录
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <FaTimes />
          </button>
        </div>
        <div className="p-4 overflow-y-auto max-h-96">
          {history.length === 0 ? (
            <p className="text-center text-gray-500 py-8">暂无历史记录</p>
          ) : (
            history
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((record, index) => (
                <div
                  key={index}
                  onClick={() => onLoad(record.date)}
                  className="p-4 bg-gradient-to-r from-red-50 to-white rounded-xl border border-red-100 mb-3 cursor-pointer hover:shadow-lg hover:border-red-300 transition-all duration-200"
                >
                  <div className="font-semibold text-red-600 mb-2">{record.date}</div>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded-full">
                      <FaFire className="text-red-500" /> {record.totalCalories} 千卡
                    </span>
                    <span className="bg-blue-100 px-2 py-1 rounded-full">蛋白质: {record.totalProtein}g</span>
                    <span className="bg-yellow-100 px-2 py-1 rounded-full">脂肪: {record.totalFat}g</span>
                    <span className="bg-orange-100 px-2 py-1 rounded-full">碳水: {record.totalCarbs}g</span>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(HistoryModal);