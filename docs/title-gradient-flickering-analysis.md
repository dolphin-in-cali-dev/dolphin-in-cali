# TitleGradient 깜빡임 현상 분석

## 문제 개요

`TitleAnimation.tsx` 컴포넌트에서 사용되는 `TitleGradient` 컴포넌트의 WebGL 기반 애니메이션 셰이더가 브라우저 창 크기 변경 시 깜빡이는 현상이 발생합니다.

## 원인 분석

### 1. Resize 이벤트 처리 방식

**Gradient.js의 resize 메서드 (라인 538-548):**
```javascript
e(this, 'resize', () => {
  (this.width = window.innerWidth),
    this.minigl.setSize(this.width, this.height),
    this.minigl.setOrthographicCamera(),
    (this.xSegCount = Math.ceil(this.width * this.conf.density[0])),
    (this.ySegCount = Math.ceil(this.height * this.conf.density[1])),
    this.mesh.geometry.setTopology(this.xSegCount, this.ySegCount),
    this.mesh.geometry.setSize(this.width, this.height),
    (this.mesh.material.uniforms.u_shadow_power.value =
      this.width < 600 ? 5 : 6);
})
```

**문제점:**
- `window.innerWidth`만 사용하여 너비를 설정하지만, `this.height`는 고정값(600)을 사용
- `TitleSection`에서 동적으로 계산된 높이와 불일치 발생 가능
- Resize 이벤트가 발생할 때마다 즉시 실행되어 디바운싱 없음

### 2. Canvas 크기와 실제 컨테이너 크기 불일치

**TitleGradient.tsx:**
```tsx
<div className="h-full w-full overflow-hidden relative">
  <canvas 
    id="gradient-canvas" 
    className="h-full w-full absolute inset-0"
  />
</div>
```

**문제점:**
- Canvas는 CSS로 `h-full w-full`을 사용하여 부모 컨테이너 크기에 맞춤
- 하지만 Gradient.js의 resize 메서드는 `window.innerWidth`와 고정 `height`를 사용
- 부모 컨테이너의 실제 크기와 Gradient 인스턴스의 크기가 동기화되지 않음

### 3. Mesh Geometry 재구성 과정

**Resize 시 실행되는 작업:**
1. `minigl.setSize()` - WebGL 컨텍스트 크기 변경
2. `minigl.setOrthographicCamera()` - 카메라 재설정
3. `mesh.geometry.setTopology()` - 메시 토폴로지 재구성
4. `mesh.geometry.setSize()` - 메시 크기 재설정

**문제점:**
- 이 과정들이 동기적으로 실행되어 렌더링이 일시적으로 중단될 수 있음
- Geometry 재구성 중에는 이전 프레임이 지워지고 새 프레임이 렌더링되기 전까지 빈 화면이 보일 수 있음

### 4. Debouncing 부재

**Gradient.js init 메서드 (라인 784-790):**
```javascript
init() {
  this.initGradientColors(),
    this.initMesh(),
    this.resize(),
    requestAnimationFrame(this.animate),
    window.addEventListener('resize', this.resize);
}
```

**문제점:**
- Resize 이벤트에 디바운싱이나 쓰로틀링이 없음
- 창 크기 조정 중 매 프레임마다 resize가 호출되어 성능 저하 및 깜빡임 발생

### 5. TitleSection의 동적 높이 계산과의 충돌

**TitleSection.tsx의 높이 계산:**
```typescript
const calculateHeight = () => {
  const viewportHeight = window.innerHeight;
  const scrollDownHeight = scrollDownRef.current.offsetHeight;
  const windowWidth = window.innerWidth;
  
  const gap = windowWidth >= 1024 ? 24 : windowWidth >= 640 ? 20 : 16;
  const paddingBottom = windowWidth >= 1024 ? 24 : windowWidth >= 640 ? 20 : 24;
  
  const calculatedHeight = viewportHeight - scrollDownHeight - gap - paddingBottom;
  setTitleAnimationHeight(Math.max(calculatedHeight, 400));
};

window.addEventListener('resize', calculateHeight);
```

**문제점:**
- `TitleSection`과 `Gradient.js` 모두 resize 이벤트를 독립적으로 처리
- 두 컴포넌트의 resize 타이밍이 다를 수 있어 불일치 발생
- `TitleSection`의 높이 계산이 완료되기 전에 `Gradient`의 resize가 실행될 수 있음

## 해결 방안

### 1. Debouncing 추가

Resize 이벤트에 디바운싱을 추가하여 불필요한 재계산 방지:

```typescript
useEffect(() => {
  if (!isMounted || gradientInitialized.current) return;
  
  const gradient = new Gradient();
  gradient.initGradient('#gradient-canvas');
  gradientInitialized.current = true;
  
  // Debounced resize handler
  let resizeTimeout: NodeJS.Timeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Resize logic
    }, 150);
  };
  
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
    clearTimeout(resizeTimeout);
  };
}, [isMounted]);
```

### 2. Canvas 실제 크기 사용

`window.innerWidth` 대신 canvas 요소의 실제 크기를 사용:

```javascript
resize() {
  const rect = this.el.getBoundingClientRect();
  this.width = rect.width;
  this.height = rect.height;
  // ... 나머지 로직
}
```

### 3. ResizeObserver 사용

`ResizeObserver`를 사용하여 컨테이너 크기 변경을 더 정확하게 감지:

```typescript
useEffect(() => {
  if (!isMounted || gradientInitialized.current) return;
  
  const canvas = document.getElementById('gradient-canvas');
  if (!canvas) return;
  
  const gradient = new Gradient();
  gradient.initGradient('#gradient-canvas');
  gradientInitialized.current = true;
  
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      // Gradient resize with actual dimensions
    }
  });
  
  resizeObserver.observe(canvas);
  return () => resizeObserver.disconnect();
}, [isMounted]);
```

### 4. Double Buffering 또는 Fade Transition

Resize 중 깜빡임을 최소화하기 위해:
- Double buffering 사용
- Fade transition 적용
- Resize 중 이전 프레임 유지

### 5. TitleSection과의 동기화

`TitleSection`의 높이 계산 완료 후 `Gradient` resize 실행:

```typescript
// TitleSection에서 높이 계산 완료 시 이벤트 발생
useEffect(() => {
  if (titleAnimationHeight !== null) {
    // Custom event로 Gradient에 알림
    window.dispatchEvent(new CustomEvent('titleHeightChanged', {
      detail: { height: titleAnimationHeight }
    }));
  }
}, [titleAnimationHeight]);
```

## 권장 해결책

가장 효과적인 해결책은 **ResizeObserver를 사용하여 실제 canvas 크기를 감지하고, 디바운싱을 추가**하는 것입니다. 이렇게 하면:

1. 실제 컨테이너 크기와 정확히 동기화
2. 불필요한 resize 호출 감소
3. 깜빡임 최소화

## 참고 사항

- `Gradient.js`는 외부 라이브러리로 보이며, 직접 수정이 어려울 수 있음
- `TitleGradient.tsx`에서 wrapper로 처리하거나, resize 이벤트를 가로채서 처리하는 방법 고려
- WebGL 컨텍스트의 크기 변경은 비용이 큰 작업이므로 최소화 필요

