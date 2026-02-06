# 修复 localStorage 错误

## 问题描述
如果遇到以下错误：
```
Error loading currentDate from localStorage: SyntaxError: Unexpected non-whitespace character after JSON at position 4
```

## 原因
localStorage 中存储的 `currentDate` 数据格式可能损坏。

## 解决方案

### 方法 1：在浏览器控制台清除（推荐）

1. 打开应用
2. 按 F12 打开开发者工具
3. 切换到 Console（控制台）标签
4. 粘贴并运行以下代码：

```javascript
localStorage.clear();
location.reload();
```

### 方法 2：仅清除特定键

如果不想清除所有数据，只清除损坏的项：

```javascript
localStorage.removeItem('currentDate');
localStorage.removeItem('selectedDishes');
localStorage.removeItem('customDishes');
localStorage.removeItem('calorieHistory');
location.reload();
```

## 已修复的代码
`useLocalStorage` hook 已经更新，现在可以正确处理字符串类型的数据：

- 字符串类型（如 `currentDate`）直接存储和读取，不使用 JSON
- 对象和数组类型使用 JSON.stringify 和 JSON.parse
- 增强了错误处理，即使数据损坏也能优雅降级

## 验证修复
重新加载应用后，localStorage 错误应该消失，应用会正常工作。