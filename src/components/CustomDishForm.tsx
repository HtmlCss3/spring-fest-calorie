import React from 'react';
import { FaPlus, FaTimes, FaPlusCircle } from 'react-icons/fa';
import { dishTypes } from '../data/dishes';

interface CustomDishFormProps {
  isOpen: boolean;
  onSubmit: (e: React.FormEvent, formData: CustomDishFormData) => void;
  onClose: () => void;
  formData: CustomDishFormData;
  onFormChange: (formData: CustomDishFormData) => void;
}

export interface CustomDishFormData {
  name: string;
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
  portion: number;
  icon: string;
  cuisine: string;
  type: string;
}

const CustomDishForm: React.FC<CustomDishFormProps> = ({
  isOpen,
  onSubmit,
  onClose,
  formData,
  onFormChange,
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field: keyof CustomDishFormData, value: string | number) => {
    onFormChange({ ...formData, [field]: value });
  };

  return (
    <div className="card overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaPlusCircle /> 添加自定义菜品
        </h2>
      </div>
      <div className="p-6">
        <form onSubmit={(e) => onSubmit(e, formData)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">菜品名称</label>
              <input
                type="text"
                className="input-field"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">热量 (千卡/100g)</label>
              <input
                type="number"
                className="input-field"
                value={formData.calories}
                onChange={(e) => handleInputChange('calories', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">蛋白质 (g/100g)</label>
              <input
                type="number"
                className="input-field"
                value={formData.protein}
                onChange={(e) => handleInputChange('protein', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">脂肪 (g/100g)</label>
              <input
                type="number"
                className="input-field"
                value={formData.fat}
                onChange={(e) => handleInputChange('fat', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">碳水化合物 (g/100g)</label>
              <input
                type="number"
                className="input-field"
                value={formData.carbs}
                onChange={(e) => handleInputChange('carbs', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">默认分量 (g)</label>
              <input
                type="number"
                className="input-field"
                value={formData.portion}
                onChange={(e) => handleInputChange('portion', parseInt(e.target.value) || 0)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">图标</label>
              <input
                type="text"
                className="input-field"
                value={formData.icon}
                onChange={(e) => handleInputChange('icon', e.target.value)}
                maxLength={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">类型</label>
              <select
                className="select-field"
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
              >
                {dishTypes.slice(1).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button type="submit" className="btn-primary">
              <FaPlus /> 添加
            </button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              <FaTimes /> 取消
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(CustomDishForm);