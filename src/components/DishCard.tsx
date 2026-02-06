import React from 'react';
import { FaFire, FaPlus } from 'react-icons/fa';
import type { Dish, CustomDish } from '../data/dishes';

interface DishCardProps {
  dish: Dish | CustomDish;
  onAdd: (dish: Dish | CustomDish) => void;
}

const DishCard: React.FC<DishCardProps> = ({ dish, onAdd }) => {
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd(dish);
  };

  return (
    <div className="dish-card">
      <div className="dish-icon">{dish.icon}</div>
      <h6 className="dish-name">{dish.name}</h6>
      <p className="dish-info">
        <small>
          {dish.cuisine} · {dish.type}
        </small>
      </p>
      <p className="dish-calories">
        <FaFire /> {dish.calories} 千卡/100g
      </p>
      <button className="btn-add" onClick={handleAdd}>
        <FaPlus /> 添加
      </button>
    </div>
  );
};

export default React.memo(DishCard);