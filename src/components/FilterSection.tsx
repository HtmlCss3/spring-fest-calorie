import React from 'react';
import { FaUtensils, FaChevronDown, FaChevronUp, FaPlusCircle } from 'react-icons/fa';
import { cuisines, dishTypes } from '../data/dishes';

interface FilterSectionProps {
  showFilters: boolean;
  currentDate: string;
  selectedCuisine: string;
  selectedType: string;
  onToggleFilters: () => void;
  onDateChange: (date: string) => void;
  onCuisineChange: (cuisine: string) => void;
  onTypeChange: (type: string) => void;
  onAddCustomClick: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  showFilters,
  currentDate,
  selectedCuisine,
  selectedType,
  onToggleFilters,
  onDateChange,
  onCuisineChange,
  onTypeChange,
  onAddCustomClick,
}) => {
  return (
    <div className="card overflow-hidden">
      <div
        className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 flex items-center justify-between cursor-pointer"
        onClick={onToggleFilters}
      >
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaUtensils /> 选择菜品
        </h2>
        {showFilters ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {showFilters && (
        <div className="p-6 space-y-4 animate-slide-down">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
              <input type="date" className="input-field" value={currentDate} onChange={(e) => onDateChange(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">菜系</label>
              <select className="select-field" value={selectedCuisine} onChange={(e) => onCuisineChange(e.target.value)}>
                {cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">类型</label>
              <select className="select-field" value={selectedType} onChange={(e) => onTypeChange(e.target.value)}>
                {dishTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <button onClick={onAddCustomClick} className="btn-primary">
              <FaPlusCircle /> 添加自定义菜品
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(FilterSection);