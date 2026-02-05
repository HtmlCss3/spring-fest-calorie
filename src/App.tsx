import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { dishes, cuisines, dishTypes, activityFactors, alternativeDishes } from './data/dishes';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { FaFire, FaRunning, FaUtensils, FaHeart, FaChartPie, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

function App() {
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState('全部');
  const [selectedType, setSelectedType] = useState('全部');
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    const total = selectedDishes.reduce((sum, dish) => {
      const dishData = dishes.find(d => d.id === dish.id);
      return sum + (dishData ? dishData.calories * (dish.quantity / 100) : 0);
    }, 0);
    setTotalCalories(total);
  }, [selectedDishes]);

  const filteredDishes = dishes.filter(dish => {
    const cuisineMatch = selectedCuisine === '全部' || dish.cuisine === selectedCuisine;
    const typeMatch = selectedType === '全部' || dish.type === selectedType;
    return cuisineMatch && typeMatch;
  });

  const addDish = (dish) => {
    const existingDish = selectedDishes.find(d => d.id === dish.id);
    if (existingDish) {
      setSelectedDishes(selectedDishes.map(d =>
        d.id === dish.id ? { ...d, quantity: d.quantity + dish.portion } : d
      ));
    } else {
      setSelectedDishes([...selectedDishes, { ...dish, quantity: dish.portion }]);
    }
  };

  const removeDish = (dishId) => {
    setSelectedDishes(selectedDishes.filter(d => d.id !== dishId));
  };

  const updateQuantity = (dishId, delta) => {
    setSelectedDishes(selectedDishes.map(d => {
      if (d.id === dishId) {
        const newQuantity = d.quantity + delta;
        return newQuantity > 0 ? { ...d, quantity: newQuantity } : d;
      }
      return d;
    }));
  };

  const getActivityTime = (activity, calories) => {
    const factor = activityFactors[activity];
    return Math.round(calories / factor);
  };

  const getChartData = () => {
    const typeData = {};
    selectedDishes.forEach(dish => {
      const dishData = dishes.find(d => d.id === dish.id);
      if (dishData) {
        const calories = dishData.calories * (dish.quantity / 100);
        typeData[dishData.type] = (typeData[dishData.type] || 0) + calories;
      }
    });
    return Object.entries(typeData).map(([type, calories]) => ({
      name: type,
      value: Math.round(calories),
    }));
  };

  const getHealthTips = () => {
    const tips = [];
    const meatCalories = selectedDishes
      .filter(d => dishes.find(dish => dish.id === d.id)?.type === '荤菜')
      .reduce((sum, d) => {
        const dishData = dishes.find(dish => dish.id === d.id);
        return sum + (dishData ? dishData.calories * (d.quantity / 100) : 0);
      }, 0);

    if (totalCalories > 3000) {
      tips.push({
        type: 'warning',
        icon: '⚠️',
        text: '热量摄入较高，建议减少高热量菜品，增加蔬菜摄入'
      });
    } else if (totalCalories > 2000) {
      tips.push({
        type: 'info',
        icon: '💡',
        text: '热量适中，可以适当增加运动消耗'
      });
    } else {
      tips.push({
        type: 'success',
        icon: '✅',
        text: '热量控制得很好，继续保持！'
      });
    }

    if (meatCalories > totalCalories * 0.6) {
      tips.push({
        type: 'warning',
        icon: '🥬',
        text: '荤菜比例过高，建议增加素菜和汤品'
      });
    }

    return tips;
  };

  const getAlternatives = () => {
    const alternatives = [];
    selectedDishes.forEach(dish => {
      const dishData = dishes.find(d => d.id === dish.id);
      if (dishData && alternativeDishes[dishData.name]) {
        alternatives.push({
          original: dishData.name,
          alternative: alternativeDishes[dishData.name].name,
          saved: alternativeDishes[dishData.name].calorieDiff * (dish.quantity / 100),
        });
      }
    });
    return alternatives;
  };

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  return (
    <div className="app-container">
      <header className="spring-header">
        <div className="header-content">
          <h1 className="title">🧧 春节美食热量计算器 🧧</h1>
          <p className="subtitle">2026 马年 · 健康年夜饭助手</p>
        </div>
      </header>

      <div className="container-fluid main-content">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="card filter-card">
              <div className="card-body">
                <h5 className="card-title"><FaUtensils /> 选择菜品</h5>
                <div className="filter-section">
                  <div className="filter-group">
                    <label>菜系：</label>
                    <select
                      className="form-select"
                      value={selectedCuisine}
                      onChange={(e) => setSelectedCuisine(e.target.value)}
                    >
                      {cuisines.map(cuisine => (
                        <option key={cuisine} value={cuisine}>{cuisine}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-group">
                    <label>类型：</label>
                    <select
                      className="form-select"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      {dishTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="dish-grid">
              {filteredDishes.map(dish => (
                <div key={dish.id} className="dish-card">
                  <div className="dish-icon">{dish.icon}</div>
                  <h6 className="dish-name">{dish.name}</h6>
                  <p className="dish-info">
                    <small>{dish.cuisine} · {dish.type}</small>
                  </p>
                  <p className="dish-calories">
                    <FaFire /> {dish.calories} 千卡/100g
                  </p>
                  <button
                    className="btn btn-add"
                    onClick={() => addDish(dish)}
                  >
                    <FaPlus /> 添加
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="sidebar">
              <div className="card total-card">
                <div className="card-body">
                  <h5 className="card-title"><FaChartPie /> 热量总览</h5>
                  <div className="total-calories">
                    <span className="calories-number">{Math.round(totalCalories)}</span>
                    <span className="calories-unit">千卡</span>
                  </div>
                  {selectedDishes.length > 0 && (
                    <div className="chart-container">
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={getChartData()}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.name} ${entry.value}`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {getChartData().map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>

              <div className="card activity-card">
                <div className="card-body">
                  <h5 className="card-title"><FaRunning /> 运动换算</h5>
                  {totalCalories > 0 ? (
                    <div className="activity-list">
                      {Object.entries(activityFactors).map(([activity, factor]) => (
                        <div key={activity} className="activity-item">
                          <span className="activity-name">{activity}</span>
                          <span className="activity-time">
                            {getActivityTime(activity, totalCalories)} 分钟
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">请添加菜品查看运动换算</p>
                  )}
                </div>
              </div>

              {getHealthTips().length > 0 && (
                <div className="card tips-card">
                  <div className="card-body">
                    <h5 className="card-title"><FaHeart /> 健康建议</h5>
                    {getHealthTips().map((tip, index) => (
                      <div key={index} className={`tip-item tip-${tip.type}`}>
                        <span className="tip-icon">{tip.icon}</span>
                        <span className="tip-text">{tip.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {getAlternatives().length > 0 && (
                <div className="card alternatives-card">
                  <div className="card-body">
                    <h5 className="card-title">🍽️ 低热量替代</h5>
                    {getAlternatives().map((alt, index) => (
                      <div key={index} className="alternative-item">
                        <div className="alt-original">{alt.original}</div>
                        <div className="alt-arrow">→</div>
                        <div className="alt-alternative">{alt.alternative}</div>
                        <div className="alt-saved text-success">
                          省约 {Math.round(alt.saved)} 千卡
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="card selected-card">
                <div className="card-body">
                  <h5 className="card-title">🍴 已选菜品</h5>
                  {selectedDishes.length > 0 ? (
                    <div className="selected-list">
                      {selectedDishes.map(dish => {
                        const dishData = dishes.find(d => d.id === dish.id);
                        if (!dishData) return null;
                        const calories = Math.round(dishData.calories * (dish.quantity / 100));
                        return (
                          <div key={dish.id} className="selected-item">
                            <div className="item-info">
                              <span className="item-icon">{dishData.icon}</span>
                              <div className="item-details">
                                <div className="item-name">{dishData.name}</div>
                                <div className="item-calories">{calories} 千卡</div>
                              </div>
                            </div>
                            <div className="item-controls">
                              <button
                                className="btn btn-sm btn-control"
                                onClick={() => updateQuantity(dish.id, -50)}
                              >
                                <FaMinus />
                              </button>
                              <span className="item-quantity">{dish.quantity}g</span>
                              <button
                                className="btn btn-sm btn-control"
                                onClick={() => updateQuantity(dish.id, 50)}
                              >
                                <FaPlus />
                              </button>
                              <button
                                className="btn btn-sm btn-remove"
                                onClick={() => removeDish(dish.id)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-muted">还没有选择菜品</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="spring-footer">
        <p>🧨 2026 马年春节快乐！祝您身体健康，万事如意！🧨</p>
      </footer>
    </div>
  );
}

export default App;