# 春节美食热量计算器 (Spring Fest Calorie Calculator)

## 项目概述

这是一个基于 React + TypeScript + Vite 开发的春节美食热量计算器，帮助用户计算春节年夜饭的热量摄入，提供健康建议和运动换算功能。

### 主要技术栈

- **前端框架**: React 19.2.4
- **开发语言**: TypeScript 5.9.3 (严格模式)
- **构建工具**: Vite 7.2.4
- **UI 框架**: Tailwind CSS 4.1.18
- **图表库**: Recharts 3.7.0
- **图标库**: React Icons 5.5.0
- **代码质量**: ESLint + Prettier + Husky
- **类型检查**: TypeScript 严格模式

### 项目架构

```
spring-fest-calorie/
├── src/
│   ├── main.tsx               # 应用入口
│   ├── App.tsx                # 主应用组件
│   ├── index.css              # 全局样式 (Tailwind)
│   ├── components/            # React 组件
│   │   ├── Header.tsx
│   │   ├── DishCard.tsx
│   │   ├── FilterSection.tsx
│   │   ├── CustomDishForm.tsx
│   │   ├── SelectedDishesList.tsx
│   │   ├── HistoryModal.tsx
│   │   ├── CalorieOverview.tsx
│   │   ├── NutritionChart.tsx
│   │   ├── HealthTips.tsx
│   │   ├── AlternativeDishes.tsx
│   │   └── Toast.tsx
│   ├── hooks/                 # 自定义 Hooks
│   │   ├── useAppData.ts
│   │   ├── useNutritionCalculation.ts
│   │   ├── useFiltering.ts
│   │   ├── useHealthTips.ts
│   │   ├── useExport.ts
│   │   └── useAlternatives.ts
│   ├── types/                 # TypeScript 类型定义
│   │   └── index.ts
│   ├── utils/                 # 工具函数
│   │   ├── calculator.ts
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   └── data/
│       └── dishes.ts          # 菜品数据
├── public/                    # 静态资源
├── index.html                 # HTML 入口
├── package.json               # 项目配置
├── tsconfig.json              # TypeScript 配置
├── tailwind.config.js         # Tailwind 配置
├── .eslintrc.json             # ESLint 配置
├── .prettierrc                # Prettier 配置
└── vite.config.ts             # Vite 配置
```

## 核心功能

1. **菜品选择与筛选**
   - 按菜系筛选（本帮菜、川菜、粤菜、东北菜等 16 种）
   - 按类型筛选（荤菜、素菜、汤品、主食、点心）
   - 65 道春节经典菜品数据

2. **热量计算**
   - 实时计算已选菜品总热量
   - 支持调整菜品数量（以 50g 为单位）
   - 饼图可视化展示各类型菜品热量占比

3. **运动换算**
   - 计算消耗总热量所需的运动时间
   - 支持 8 种运动类型（跑步、步行、游泳、骑行、跳绳、瑜伽、跳操、爬山）

4. **健康建议**
   - 基于总热量摄入的健康提示
   - 基于荤素比例的饮食建议
   - 低热量替代菜品推荐

5. **已选菜品管理**
   - 添加/删除菜品
   - 调整菜品数量
   - 实时热量显示

6. **历史记录**
   - 按日期保存记录
   - 查看历史趋势
   - 从历史记录加载

7. **数据导出**
   - 支持 JSON 格式导出
   - 支持 CSV 格式导出

8. **自定义菜品**
   - 添加自定义菜品
   - 设置营养素信息
   - 保存到本地存储

## 构建和运行

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

启动 Vite 开发服务器，默认运行在 `http://localhost:5173/`

### 构建生产版本

```bash
npm run build
```

执行流程：

1. 运行 TypeScript 类型检查 (`tsc --noEmit`)
2. 运行 Vite 构建 (`vite build`)
3. 输出到 `dist/` 目录

### 类型检查

```bash
npm run type-check
```

单独运行类型检查

### 代码检查

```bash
npm run lint
```

运行 ESLint 检查

```bash
npm run lint:fix
```

自动修复 ESLint 错误

### 代码格式化

```bash
npm run format
```

使用 Prettier 格式化代码

### 预览生产构建

```bash
npm run preview
```

预览已构建的生产版本

## 开发规范

### TypeScript 配置

- **严格模式**: 启用 (`strict: true`)
- **模块解析**: `bundler` 模式
- **精确模块语法**: `verbatimModuleSyntax: true`
- **未使用变量检查**: 启用
- **未使用参数检查**: 启用
- **隐式 any 禁止**: 启用

### 代码风格

- 使用函数式组件
- 使用自定义 Hooks 管理状态和副作用
- 使用 TypeScript 类型定义
- 组件使用 React.memo 优化性能
- 使用 useMemo 和 useCallback 缓存计算和函数
- 遵循 ESLint 和 Prettier 规则

### 项目结构规范

- **components/**: React 组件，每个组件一个文件
- **hooks/**: 自定义 Hooks，复用逻辑
- **types/**: TypeScript 类型定义
- **utils/**: 工具函数和常量
- **data/**: 静态数据

### 命名规范

- 组件使用 PascalCase: `MyComponent`
- 函数使用 camelCase: `myFunction`
- 常量使用 UPPER_SNAKE_CASE: `MY_CONSTANT`
- 类型使用 PascalCase: `MyType`

### 数据结构

**应用数据结构**:

```typescript
interface CalorieAppData {
  dailyRecords: Record<string, DailyData>; // 按日期索引的记录
  customDishes: CustomDish[]; // 全局共享的自定义菜品
  preferences: UserPreferences; // 用户偏好设置
}
```

**每日数据结构**:

```typescript
interface DailyData {
  date: string; // YYYY-MM-DD 格式
  selectedDishes: SelectedDish[];
  totalCalories: number;
  totalProtein: number;
  totalFat: number;
  totalCarbs: number;
  customDishes: CustomDish[];
  savedToHistory: boolean;
  lastModified: string;
}
```

## Git Hooks

### Pre-commit Hook

自动运行以下操作：

- lint-staged 格式化修改的文件
- ESLint 检查代码质量

### Pre-push Hook

自动运行以下操作：

- TypeScript 类型检查
- 生产构建验证

## 浏览器兼容性

- 现代浏览器（Chrome、Firefox、Safari、Edge）
- 需要支持 ES2022 语法
- 需要 JavaScript 启用

## 已实现功能

1. ✅ 菜品选择与筛选
2. ✅ 热量计算与可视化
3. ✅ 运动换算
4. ✅ 健康建议
5. ✅ 已选菜品管理
6. ✅ 历史记录功能
7. ✅ 数据导出（JSON/CSV）
8. ✅ 自定义菜品添加
9. ✅ 营养素分析
10. ✅ 分享功能
11. ✅ Toast 通知

## 扩展建议

1. 添加用户偏好设置（保存已选菜品）
2. 添加更多菜系和菜品数据
3. 添加数据备份和恢复功能
4. 添加多用户支持
5. 添加食物照片识别
6. 添加社交分享功能
7. 添加营养师建议模块
