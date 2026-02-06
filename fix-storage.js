// 在浏览器控制台运行此脚本来修复 localStorage 问题

console.log('🔧 开始修复 localStorage...');

const STORAGE_KEY = 'spring-fest-calorie-data';

// 检查当前存储
const currentData = localStorage.getItem(STORAGE_KEY);
console.log('当前存储内容:', currentData);

// 检查是否为无效数据
if (currentData === 'undefined' || currentData === 'null' || currentData === null) {
  console.log('❌ 发现无效数据，正在清除...');
  localStorage.removeItem(STORAGE_KEY);
  console.log('✅ 无效数据已清除');
} else if (currentData) {
  try {
    // 尝试解析数据
    const parsed = JSON.parse(currentData);
    console.log('✅ 数据格式正常:', parsed);
    
    // 检查数据结构
    if (!parsed.dailyRecords) {
      console.log('⚠️ 缺少 dailyRecords，正在修复...');
      parsed.dailyRecords = {};
    }
    if (!parsed.customDishes) {
      console.log('⚠️ 缺少 customDishes，正在修复...');
      parsed.customDishes = [];
    }
    if (!parsed.preferences) {
      console.log('⚠️ 缺少 preferences，正在修复...');
      parsed.preferences = {
        defaultCuisine: '全部',
        defaultType: '全部',
        enableNotifications: false
      };
    }
    
    // 保存修复后的数据
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    console.log('✅ 数据已修复并保存');
  } catch (e) {
    console.error('❌ 数据解析失败:', e);
    console.log('正在清除损坏的数据...');
    localStorage.removeItem(STORAGE_KEY);
    console.log('✅ 损坏的数据已清除');
  }
} else {
  console.log('✅ localStorage 为空，无需修复');
}

console.log('🎉 修复完成！页面将在 2 秒后刷新...');
setTimeout(() => {
  location.reload();
}, 2000);