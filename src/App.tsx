import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { dishes, cuisines, dishTypes, activityFactors, alternativeDishes } from './data/dishes';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { FaFire, FaRunning, FaUtensils, FaHeart, FaChartPie, FaTrash, FaPlus, FaMinus, FaShareAlt, FaDownload, FaCalendarAlt, FaSave, FaPlusCircle, FaTimes, FaHistory } from 'react-icons/fa';

function App() {
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState('全部');
  const [selectedType, setSelectedType] = useState('全部');
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [customDishes, setCustomDishes] = useState([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customForm, setCustomForm] = useState({
    name: '',
    calories: '',
    protein: '',
    fat: '',
    carbs: '',
    portion: 100,
    icon: '🍽️',
    cuisine: '自定义',
    type: '荤菜',
  });
  const [history, setHistory] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [showHistory, setShowHistory] = useState(false);
  const [showNutrition, setShowNutrition] = useState(false);

  // 从 localStorage 加载数据
  useEffect(() => {
    const savedDishes = localStorage.getItem('selectedDishes');
    const savedCustomDishes = localStorage.getItem('customDishes');
    const savedHistory = localStorage.getItem('calorieHistory');
    const savedDate = localStorage.getItem('currentDate');

    if (savedDishes) setSelectedDishes(JSON.parse(savedDishes));
    if (savedCustomDishes) setCustomDishes(JSON.parse(savedCustomDishes));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedDate) setCurrentDate(savedDate);
  }, []);

  // 保存到 localStorage
  useEffect(() => {
    localStorage.setItem('selectedDishes', JSON.stringify(selectedDishes));
  }, [selectedDishes]);

  useEffect(() => {
    localStorage.setItem('customDishes', JSON.stringify(customDishes));
  }, [customDishes]);

  useEffect(() => {
    localStorage.setItem('calorieHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('currentDate', currentDate);
  }, [currentDate]);

  // 计算总热量和营养素
  useEffect(() => {
    const total = selectedDishes.reduce((sum, dish) => {
      const dishData = [...dishes, ...customDishes].find(d => d.id === dish.id);
      return sum + (dishData ? dishData.calories * (dish.quantity / 100) : 0);
    }, 0);
    setTotalCalories(total);

    const protein = selectedDishes.reduce((sum, dish) => {
      const dishData = [...dishes, ...customDishes].find(d => d.id === dish.id);
      return sum + (dishData ? dishData.protein * (dish.quantity / 100) : 0);
    }, 0);
    setTotalProtein(protein);

    const fat = selectedDishes.reduce((sum, dish) => {
      const dishData = [...dishes, ...customDishes].find(d => d.id === dish.id);
      return sum + (dishData ? dishData.fat * (dish.quantity / 100) : 0);
    }, 0);
    setTotalFat(fat);

    const carbs = selectedDishes.reduce((sum, dish) => {
      const dishData = [...dishes, ...customDishes].find(d => d.id === dish.id);
      return sum + (dishData ? dishData.carbs * (dish.quantity / 100) : 0);
    }, 0);
    setTotalCarbs(carbs);
  }, [selectedDishes, customDishes]);

  const allDishes = [...dishes, ...customDishes];

  const filteredDishes = allDishes.filter(dish => {
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
      const dishData = allDishes.find(d => d.id === dish.id);
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

  const getNutritionData = () => {
    return [
      { name: '蛋白质', value: Math.round(totalProtein), color: '#36A2EB' },
      { name: '脂肪', value: Math.round(totalFat), color: '#FF6384' },
      { name: '碳水化合物', value: Math.round(totalCarbs), color: '#FFCE56' },
    ];
  };

  const getHealthTips = () => {
    const tips = [];
    const meatCalories = selectedDishes
      .filter(d => allDishes.find(dish => dish.id === d.id)?.type === '荤菜')
      .reduce((sum, d) => {
        const dishData = allDishes.find(dish => dish.id === d.id);
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

    if (totalProtein < 30 && totalCalories > 0) {
      tips.push({
        type: 'info',
        icon: '🥚',
        text: '蛋白质摄入不足，建议增加肉类、蛋类或豆制品'
      });
    }

    return tips;
  };

  const getAlternatives = () => {
    const alternatives = [];
    selectedDishes.forEach(dish => {
      const dishData = allDishes.find(d => d.id === dish.id);
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

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const newDish = {
      id: Date.now(),
      ...customForm,
      calories: parseFloat(customForm.calories),
      protein: parseFloat(customForm.protein),
      fat: parseFloat(customForm.fat),
      carbs: parseFloat(customForm.carbs),
      portion: parseInt(customForm.portion),
    };
    setCustomDishes([...customDishes, newDish]);
    setCustomForm({
      name: '',
      calories: '',
      protein: '',
      fat: '',
      carbs: '',
      portion: 100,
      icon: '🍽️',
      cuisine: '自定义',
      type: '荤菜',
    });
    setShowCustomForm(false);
  };

  const saveToHistory = () => {
    const newRecord = {
      date: currentDate,
      dishes: [...selectedDishes],
      totalCalories: Math.round(totalCalories),
      totalProtein: Math.round(totalProtein),
      totalFat: Math.round(totalFat),
      totalCarbs: Math.round(totalCarbs),
    };
    const existingIndex = history.findIndex(h => h.date === currentDate);
    if (existingIndex >= 0) {
      const newHistory = [...history];
      newHistory[existingIndex] = newRecord;
      setHistory(newHistory);
    } else {
      setHistory([...history, newRecord]);
    }
    alert('已保存到历史记录！');
  };

  const loadFromHistory = (date) => {
    const record = history.find(h => h.date === date);
    if (record) {
      setSelectedDishes(record.dishes);
      setCurrentDate(date);
      setShowHistory(false);
    }
  };

  const handleShare = () => {
    const shareText = `🧧 春节美食热量计算器 🧧\n\n📅 日期: ${currentDate}\n🔥 总热量: ${Math.round(totalCalories)} 千卡\n\n📊 营养素:\n• 蛋白质: ${Math.round(totalProtein)}g\n• 脂肪: ${Math.round(totalFat)}g\n• 碳水化合物: ${Math.round(totalCarbs)}g\n\n已选菜品:\n${selectedDishes.map(d => {
      const dishData = allDishes.find(dish => dish.id === d.id);
      return `- ${dishData?.name} (${d.quantity}g)`;
    }).join('\n')}\n\n🧨 2026 马年春节快乐！`;

    if (navigator.share) {
      navigator.share({
        title: '春节美食热量计算器',
        text: shareText,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        alert('已复制到剪贴板！');
      }).catch(() => {
        alert('分享失败');
      });
    }
  };

  const handleExport = (format) => {
    const record = {
      date: currentDate,
      totalCalories: Math.round(totalCalories),
      totalProtein: Math.round(totalProtein),
      totalFat: Math.round(totalFat),
      totalCarbs: Math.round(totalCarbs),
      dishes: selectedDishes.map(d => {
        const dishData = allDishes.find(dish => dish.id === d.id);
        return {
          name: dishData?.name,
          quantity: d.quantity,
          calories: Math.round(dishData?.calories * (d.quantity / 100)),
          protein: Math.round(dishData?.protein * (d.quantity / 100)),
          fat: Math.round(dishData?.fat * (d.quantity / 100)),
          carbs: Math.round(dishData?.carbs * (d.quantity / 100)),
        };
      }),
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `calorie-report-${currentDate}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      let csv = '菜品名称,分量,热量(千卡),蛋白质,脂肪,碳水化合物\n';
      record.dishes.forEach(dish => {
        csv += `${dish.name},${dish.quantity},${dish.calories},${dish.protein},${dish.fat},${dish.carbs}\n`;
      });
      csv += `\n总计,${record.dishes.reduce((sum, d) => sum + d.quantity, 0)},${record.totalCalories},${record.totalProtein},${record.totalFat},${record.totalCarbs}\n`;
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `calorie-report-${currentDate}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

  const getHistoryChartData = () => {
    return history
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(h => ({
        date: h.date.slice(5),
        热量: h.totalCalories,
      }));
  };

  return (
    <div className="app-container">
      <header className="spring-header">
        <div className="header-content">
          <h1 className="title">🧧 春节美食热量计算器 🧧</h1>
          <p className="subtitle">2026 马年 · 健康年夜饭助手</p>
          <div className="header-actions">
            <button className="btn btn-header" onClick={() => setShowHistory(!showHistory)}>
              <FaHistory /> 历史记录
            </button>
            <button className="btn btn-header" onClick={handleShare}>
              <FaShareAlt /> 分享
            </button>
          </div>
        </div>
      </header>

      {showHistory && (
        <div className="history-modal">
          <div className="history-content">
            <div className="history-header">
              <h3><FaCalendarAlt /> 历史记录</h3>
              <button className="btn-close" onClick={() => setShowHistory(false)}><FaTimes /></button>
            </div>
            <div className="history-list">
              {history.length === 0 ? (
                <p className="text-muted">暂无历史记录</p>
              ) : (
                history.sort((a, b) => new Date(b.date) - new Date(a.date)).map((record, index) => (
                  <div key={index} className="history-item" onClick={() => loadFromHistory(record.date)}>
                    <div className="history-date">{record.date}</div>
                    <div className="history-stats">
                      <span><FaFire /> {record.totalCalories} 千卡</span>
                      <span>蛋白质: {record.totalProtein}g</span>
                      <span>脂肪: {record.totalFat}g</span>
                      <span>碳水: {record.totalCarbs}g</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container-fluid main-content">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="card filter-card">
              <div className="card-body">
                <h5 className="card-title"><FaUtensils /> 选择菜品</h5>
                <div className="filter-section">
                  <div className="filter-group">
                    <label>日期：</label>
                    <input
                      type="date"
                      className="form-control"
                      value={currentDate}
                      onChange={(e) => setCurrentDate(e.target.value)}
                    />
                  </div>
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
                  <div className="filter-group">
                    <button className="btn btn-custom" onClick={() => setShowCustomForm(true)}>
                      <FaPlusCircle /> 添加自定义菜品
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {showCustomForm && (
              <div className="card custom-form-card">
                <div className="card-body">
                  <h5 className="card-title"><FaPlusCircle /> 添加自定义菜品</h5>
                  <form onSubmit={handleCustomSubmit}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>菜品名称</label>
                        <input
                          type="text"
                          className="form-control"
                          value={customForm.name}
                          onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>热量 (千卡/100g)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={customForm.calories}
                          onChange={(e) => setCustomForm({ ...customForm, calories: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>蛋白质 (g/100g)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={customForm.protein}
                          onChange={(e) => setCustomForm({ ...customForm, protein: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>脂肪 (g/100g)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={customForm.fat}
                          onChange={(e) => setCustomForm({ ...customForm, fat: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>碳水化合物 (g/100g)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={customForm.carbs}
                          onChange={(e) => setCustomForm({ ...customForm, carbs: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>默认分量 (g)</label>
                        <input
                          type="number"
                          className="form-control"
                          value={customForm.portion}
                          onChange={(e) => setCustomForm({ ...customForm, portion: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>图标</label>
                        <input
                          type="text"
                          className="form-control"
                          value={customForm.icon}
                          onChange={(e) => setCustomForm({ ...customForm, icon: e.target.value })}
                          maxLength={2}
                        />
                      </div>
                      <div className="form-group">
                        <label>类型</label>
                        <select
                          className="form-control"
                          value={customForm.type}
                          onChange={(e) => setCustomForm({ ...customForm, type: e.target.value })}
                        >
                          {dishTypes.slice(1).map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn btn-primary"><FaPlus /> 添加</button>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowCustomForm(false)}><FaTimes /> 取消</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

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

            {history.length > 0 && (
              <div className="card trend-card">
                <div className="card-body">
                  <h5 className="card-title"><FaChartPie /> 热量趋势</h5>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={getHistoryChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="热量" stroke="#c41e3a" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
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
                  <div className="date-display">
                    <FaCalendarAlt /> {currentDate}
                  </div>
                  <div className="save-buttons">
                    <button className="btn btn-save" onClick={saveToHistory}>
                      <FaSave /> 保存记录
                    </button>
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

              {selectedDishes.length > 0 && (
                <div className="card nutrition-card">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FaHeart /> 营养素分析
                      <button className="btn-toggle" onClick={() => setShowNutrition(!showNutrition)}>
                        {showNutrition ? '收起' : '展开'}
                      </button>
                    </h5>
                    {showNutrition && (
                      <>
                        <div className="nutrition-summary">
                          <div className="nutrition-item">
                            <span className="nutrition-label">蛋白质</span>
                            <span className="nutrition-value protein">{Math.round(totalProtein)}g</span>
                          </div>
                          <div className="nutrition-item">
                            <span className="nutrition-label">脂肪</span>
                            <span className="nutrition-value fat">{Math.round(totalFat)}g</span>
                          </div>
                          <div className="nutrition-item">
                            <span className="nutrition-label">碳水化合物</span>
                            <span className="nutrition-value carbs">{Math.round(totalCarbs)}g</span>
                          </div>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart data={getNutritionData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#c41e3a" />
                          </BarChart>
                        </ResponsiveContainer>
                      </>
                    )}
                  </div>
                </div>
              )}

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
                    <>
                      <div className="selected-list">
                        {selectedDishes.map(dish => {
                          const dishData = allDishes.find(d => d.id === dish.id);
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
                      <div className="export-buttons">
                        <button className="btn btn-export" onClick={() => handleExport('csv')}>
                          <FaDownload /> 导出 CSV
                        </button>
                        <button className="btn btn-export" onClick={() => handleExport('json')}>
                          <FaDownload /> 导出 JSON
                        </button>
                      </div>
                    </>
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