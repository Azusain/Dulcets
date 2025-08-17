# Loading Animation 说明文档

## 主要文件
- **`src/components/LoadingManager.tsx`** - React组件结构
- **`src/app/loading.css`** - 动画样式和定位

## 核心组件结构

### HTML结构 (LoadingManager.tsx)
```jsx
<div className="loading-animation">
  <div className="vertical-line"></div>          // 白色垂直线
  <div className="portal-mask">                 // 传送门遮罩容器
    <div className="logo-container logo-left">  // 左侧logo容器
      <img src="/images/logo_left.png" />
    </div>
    <div className="logo-container logo-right"> // 右侧logo容器
      <img src="/images/logo_right.png" />
    </div>
  </div>
</div>
```

## 主要控制定位的CSS类

### 1. `.portal-mask` - 传送门遮罩容器
```css
.portal-mask {
  position: absolute;
  top: 50%;
  left: -5px;           // 👈 控制遮罩容器的水平位置
  width: 10px;          // 👈 遮罩宽度（传送门大小）
  height: 192px;
  transform: translateY(-50%);
  overflow: hidden;     // 👈 关键：裁剪超出部分
  z-index: 4;
}
```

### 2. `.logo-left` - 左侧logo定位
```css
.logo-left {
  left: -55px;                              // 👈 左logo初始位置
  animation: logoPortalLeft 2.5s ease-in-out forwards;
}
```

### 3. `.logo-right` - 右侧logo定位
```css
.logo-right {
  left: -55px;                              // 👈 右logo初始位置（应该和左边不同）
  animation: logoPortalRight 2.5s ease-in-out forwards;
}
```

### 4. 动画关键帧
```css
@keyframes logoPortalLeft {
  0% { transform: translateY(-50%) translateX(50px); }   // 👈 左logo起始位置
  70% { transform: translateY(-50%) translateX(-150px); } // 👈 左logo终点位置
}

@keyframes logoPortalRight {
  0% { transform: translateY(-50%) translateX(-50px); }   // 👈 右logo起始位置
  70% { transform: translateY(-50%) translateX(150px); }  // 👈 右logo终点位置
}
```

## 🔧 修复"全在左边"的问题

**问题根源**：两个logo的初始`left`值相同，都是`-55px`

**解决方案**：
1. 修改 `.logo-right` 的 `left` 值，让它从不同位置开始
2. 或者调整动画的 `translateX` 起始值

## 🎯 快速修复建议

在 `loading.css` 中找到：
```css
.logo-right {
  left: -55px;  // 👈 改成不同的值，比如 left: 5px;
}
```

或者调整动画起始点让右logo从更右边的位置开始移动。
