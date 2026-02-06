import React, { useState, useMemo } from 'react';
import './index.css';
import { dishes, type Dish, type CustomDish } from './data/dishes';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Components
import Header from './components/Header';
import DishCard from './components/DishCard';
import FilterSection from './components/FilterSection';
import CustomDishForm, { type CustomDishFormData } from './components/CustomDishForm';
import SelectedDishesList from './components/SelectedDishesList';
import HistoryModal from './components/HistoryModal';
import CalorieOverview from './components/CalorieOverview';
import NutritionChart from './components/NutritionChart';
import HealthTips from './components/HealthTips';
import AlternativeDishes from './components/AlternativeDishes';

// Hooks
import { useAppData } from './hooks/useAppData';
import { useNutritionCalculation } from './hooks/useNutritionCalculation';
import { useFiltering } from './hooks/useFiltering';
import { useHealthTips } from './hooks/useHealthTips';
import { useExport } from './hooks/useExport';
import { useAlternatives } from './hooks/useAlternatives';

// Utils
import { formatShareText } from './utils/formatters';
import { validateCustomDish } from './utils/validators';
import { CUSTOM_DISH_ID_OFFSET } from './utils/constants';

const initialCustomForm: CustomDishFormData = {
  name: '',
  calories: '',
  protein: '',
  fat: '',
  carbs: '',
  portion: 100,
  icon: '🍽️',
  cuisine: '自定义',
  type: '荤菜',
};

function App() {
  const {
    currentDate,
    currentDailyData,
    currentCustomDishes,
    historyList,
    changeDate,
    addDishToCurrentDate,
    removeDishFromCurrentDate,
    updateDishQuantity,
    addDailyCustomDish,
    saveCurrentDateToHistory,
    loadFromHistory,
  } = useAppData();

  const [selectedCuisine, setSelectedCuisine] = useState<string>('全部');
  const [selectedType, setSelectedType] = useState<string>('全部');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(true);
  const [showCustomForm, setShowCustomForm] = useState<boolean>(false);
  const [customForm, setCustomForm] = useState<CustomDishFormData>(initialCustomForm);

  const allDishes = useMemo(() => [...dishes, ...currentCustomDishes], [currentCustomDishes]);

  const { filteredDishes } = useFiltering(
    dishes,
    currentCustomDishes,
    selectedCuisine,
    selectedType
  );
  const { totalCalories, totalProtein, totalFat, totalCarbs, chartData, nutritionData } =
    useNutritionCalculation(currentDailyData.selectedDishes, currentCustomDishes, dishes);
  const { tips } = useHealthTips(
    currentDailyData.selectedDishes,
    currentCustomDishes,
    dishes,
    totalCalories,
    totalProtein
  );
  const { handleExport } = useExport();
  const { alternatives } = useAlternatives(
    currentDailyData.selectedDishes,
    currentCustomDishes,
    dishes
  );

  const addDish = (dish: Dish | CustomDish) => {
    addDishToCurrentDate({ id: dish.id, quantity: dish.portion });
  };

  const handleCustomSubmit = (e: React.FormEvent, formData: CustomDishFormData) => {
    e.preventDefault();

    const validation = validateCustomDish(formData);
    if (!validation.isValid) {
      alert('请填写正确的菜品信息');
      return;
    }

    const newDish: CustomDish = {
      id: CUSTOM_DISH_ID_OFFSET + Date.now(),
      name: formData.name,
      calories: parseFloat(formData.calories),
      protein: parseFloat(formData.protein),
      fat: parseFloat(formData.fat),
      carbs: parseFloat(formData.carbs),
      portion: formData.portion,
      icon: formData.icon,
      cuisine: formData.cuisine,
      type: formData.type,
      custom: true,
    };

    addDailyCustomDish(newDish);
    setCustomForm(initialCustomForm);
    setShowCustomForm(false);
  };

  const handleShare = () => {
    const dishesText = currentDailyData.selectedDishes
      .map((d) => {
        const dishData = allDishes.find((dish) => dish.id === d.id);
        return `- ${dishData?.name} (${d.quantity}g)`;
      })
      .join('\n');

    const shareText = formatShareText(
      currentDate,
      totalCalories,
      totalProtein,
      totalFat,
      totalCarbs,
      dishesText
    );

    if (navigator.share) {
      navigator
        .share({
          title: '春节美食热量计算器',
          text: shareText,
        })
        .catch(console.error);
    } else {
      navigator.clipboard
        .writeText(shareText)
        .then(() => alert('已复制到剪贴板！'))
        .catch(() => alert('分享失败'));
    }
  };

  const handleExportClick = (format: 'json' | 'csv') => {
    handleExport(
      currentDate,
      currentDailyData.selectedDishes,
      allDishes,
      totalCalories,
      totalProtein,
      totalFat,
      totalCarbs,
      format
    );
  };

  const getHistoryChartData = () => {
    return historyList
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((h) => ({
        date: h.date.slice(5),
        热量: h.totalCalories,
      }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-yellow-50">
      <Header onHistoryClick={() => setShowHistory(true)} onShareClick={handleShare} />

      <HistoryModal
        isOpen={showHistory}
        history={historyList}
        onLoad={loadFromHistory}
        onClose={() => setShowHistory(false)}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：菜品选择 */}
          <div className="lg:col-span-2 space-y-6">
            <FilterSection
              showFilters={showFilters}
              currentDate={currentDate}
              selectedCuisine={selectedCuisine}
              selectedType={selectedType}
              onToggleFilters={() => setShowFilters(!showFilters)}
              onDateChange={changeDate}
              onCuisineChange={setSelectedCuisine}
              onTypeChange={setSelectedType}
              onAddCustomClick={() => setShowCustomForm(true)}
            />

            {showCustomForm && (
              <CustomDishForm
                isOpen={showCustomForm}
                formData={customForm}
                onSubmit={handleCustomSubmit}
                onClose={() => setShowCustomForm(false)}
                onFormChange={setCustomForm}
              />
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} onAdd={addDish} />
              ))}
            </div>

            {historyList.length > 0 && (
              <div className="card overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">📈 热量趋势</h2>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={getHistoryChartData()}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="热量" stroke="#dc2626" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          {/* 右侧：热量总览和已选菜品 */}
          <div className="space-y-6">
            <CalorieOverview
              totalCalories={totalCalories}
              currentDate={currentDate}
              onSaveHistory={saveCurrentDateToHistory}
            />

            <SelectedDishesList
              selectedDishes={currentDailyData.selectedDishes}
              allDishes={allDishes}
              totalCalories={totalCalories}
              onRemove={removeDishFromCurrentDate}
              onUpdateQuantity={updateDishQuantity}
              onExport={handleExportClick}
            />

            {nutritionData.some((d) => d.value > 0) && (
              <NutritionChart nutritionData={nutritionData} chartData={chartData} />
            )}

            {tips.length > 0 && <HealthTips tips={tips} />}

            {alternatives.length > 0 && <AlternativeDishes alternatives={alternatives} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
