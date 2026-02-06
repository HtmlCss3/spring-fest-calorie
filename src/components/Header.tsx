import React from 'react';
import { FaHistory, FaShareAlt } from 'react-icons/fa';

interface HeaderProps {
  onHistoryClick: () => void;
  onShareClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHistoryClick, onShareClick }) => {
  return (
    <header className="relative bg-gradient-to-r from-red-600 to-red-800 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center justify-center md:justify-start gap-3">
              🧧 春节美食热量计算器
            </h1>
            <p className="mt-2 text-red-100 text-lg">2026 马年 · 健康年夜饭助手</p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onHistoryClick}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all duration-200"
            >
              <FaHistory /> 历史记录
            </button>
            <button
              onClick={onShareClick}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-all duration-200"
            >
              <FaShareAlt /> 分享
            </button>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400"></div>
    </header>
  );
};

export default React.memo(Header);