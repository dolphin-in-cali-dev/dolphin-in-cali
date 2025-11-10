# 스크롤 후 리사이즈 시 레이아웃 깨짐 현상 분석 및 해결 방안

## 문제 개요

사용자가 화면을 스크롤 아래까지 내렸다가 브라우저 창 크기를 조절하고 다시 화면을 올리면, `TitleSection`의 레이아웃이 깨지는 현상이 발생합니다. 특히 `TitleAnimation`의 높이 계산과 `TitleGradient`의 크기가 제대로 동기화되지 않아 시각적 깜빡임이나 레이아웃 오류가 발생합니다.

## 문제 발생 시나리오

1. 사용자가 페이지를 스크롤하여 `TitleSection`이 뷰포트 밖으로 이동
2. 브라우저 창 크기를 조절 (resize 이벤트 발생)
3. 다시 스크롤을 위로 올려 `TitleSection`이 뷰포트에 다시 나타남
4. 레이아웃이 깨지거나 요소들이 제대로 정렬되지 않음

## 원인 분석

### 1. TitleSection의 높이 계산 타이밍 문제

**파일:** `app/components/TitleSection.tsx`

**문제점:**
- `scrollDownRef.current.offsetHeight`를 측정할 때, 요소가 뷰포트 밖에 있으면 정확한 측정이 어려울 수 있음
- 스크롤 위치와 관계없이 `window.innerHeight`만 사용하여 계산하므로, 스크롤 후 resize 시 높이 계산이 부정확할 수 있음
- Resize 이벤트에 디바운싱이 없어 resize 중 여러 번 호출될 수 있음
- `titleAnimationHeight`가 `null`에서 계산된 값으로 변경되는 과정에서 레이아웃이 깨질 수 있음

**현재 코드:**
```typescript
const calculateHeight = () => {
  if (!scrollDownRef.current) return;
  const viewportHeight = window.innerHeight;
  const scrollDownHeight = scrollDownRef.current.offsetHeight;
  // ... 계산 로직
  setTitleAnimationHeight(Math.max(calculatedHeight, 400));
};

window.addEventListener('resize', calculateHeight); // 디바운싱 없음
```

### 2. TitleGradient의 ResizeObserver와 스크롤 위치 충돌

**파일:** `app/components/TitleGradient.tsx`

**문제점:**
- `ResizeObserver`는 canvas가 뷰포트 밖에 있어도 크기 변경을 감지하지만, 스크롤 후 다시 나타날 때 canvas의 실제 렌더링 크기와 `contentRect`가 불일치할 수 있음
- Canvas가 `absolute` 포지셔닝을 사용하고 있어, 부모 컨테이너의 높이 변경 시 즉시 반영되지 않을 수 있음
- `TitleSection`의 높이 계산과 `TitleGradient`의 resize가 비동기적으로 실행되어 타이밍 불일치 발생 가능

**현재 코드:**
```typescript
const resizeObserver = new ResizeObserver((entries) => {
  // 디바운싱은 있지만, TitleSection과의 동기화는 없음
  setTimeout(() => {
    // resize 로직 실행
  }, 150);
});
```

### 3. ScrollDownInstruction의 useScroll과 resize 충돌

**파일:** `app/components/ScrollDownInstruction.tsx`

**문제점:**
- `useScroll`의 `offset` 계산이 스크롤 위치에 따라 달라질 수 있음
- Resize 후 스크롤 위치가 변경되면 `scrollYProgress` 계산이 틀어질 수 있음
- `containerRef`의 위치가 resize 후 변경되면 offset 계산이 부정확해질 수 있음

### 4. Lenis 스크롤과 높이 계산의 비동기성

**파일:** `app/layout.tsx`

**문제점:**
- Lenis가 스크롤을 관리하는데, resize 시 스크롤 위치가 변경될 수 있음
- `TitleSection`의 높이 계산이 Lenis의 스크롤 업데이트와 동기화되지 않을 수 있음
- 스크롤 위치와 높이 계산이 서로 다른 타이밍에 실행되어 불일치 발생

### 5. 동적 높이 계산의 초기 상태 문제

**파일:** `app/components/TitleSection.tsx`

**문제점:**
- 초기 렌더링 시 `titleAnimationHeight`가 `null`이므로 `minHeight: '600px'` 사용
- Resize 후 재계산 시 값이 크게 변경되면 깜빡임 발생 가능
- `-50px` 오프셋이 하드코딩되어 있어 정확한 높이 계산과 불일치할 수 있음

**현재 코드:**
```typescript
const [titleAnimationHeight, setTitleAnimationHeight] = useState<number | null>(null);

style={titleAnimationHeight ? { height: `${titleAnimationHeight-50}px`, minHeight: '400px' } : { minHeight: '600px' }}
```

### 6. 여러 컴포넌트의 독립적인 resize 처리

**문제점:**
- `TitleSection`: `window.addEventListener('resize', calculateHeight)`
- `TitleGradient`: `ResizeObserver` 사용
- `CatchPhraseSection`: `window.addEventListener('resize', handleResize)`
- 각 컴포넌트가 독립적으로 resize를 처리하여 실행 순서가 보장되지 않음
- 하나의 컴포넌트가 다른 컴포넌트의 계산에 필요한 정보를 변경할 수 있음

## 해결 방안

### 1. TitleSection의 높이 계산 개선

**핵심 개선사항:**
- 디바운싱 추가
- 이전 값과 비교하여 불필요한 업데이트 방지
- 스크롤 위치를 고려한 정확한 측정

**개선된 코드:**
```typescript
const calculateHeight = () => {
  if (!scrollDownRef.current) return;

  const scrollDownHeight = scrollDownRef.current.offsetHeight;
  const viewportHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  
  const gap = windowWidth >= 1024 ? 24 : windowWidth >= 640 ? 20 : 16;
  const paddingBottom = windowWidth >= 1024 ? 24 : windowWidth >= 640 ? 20 : 24;
  
  const calculatedHeight = viewportHeight - scrollDownHeight - gap - paddingBottom;
  
  // 이전 값과 비교하여 불필요한 업데이트 방지
  setTitleAnimationHeight((prev) => {
    const newHeight = Math.max(calculatedHeight, 400);
    // 값이 크게 변경되지 않으면 업데이트 방지 (깜빡임 방지)
    if (prev !== null && Math.abs(prev - newHeight) < 10) {
      return prev;
    }
    return newHeight;
  });
};

// 디바운싱 추가
let resizeTimeout: NodeJS.Timeout;
const debouncedCalculateHeight = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(calculateHeight, 150);
};

window.addEventListener('resize', debouncedCalculateHeight);
```

### 2. 초기 높이 값 개선

**핵심 개선사항:**
- `null` 대신 계산된 초기값 사용
- Transition 추가로 부드러운 높이 변경

**개선된 코드:**
```typescript
// 초기값을 계산된 값으로 설정 (SSR 고려)
const [titleAnimationHeight, setTitleAnimationHeight] = useState<number>(() => {
  if (typeof window !== 'undefined') {
    return Math.max(window.innerHeight - 100, 400); // 대략적인 초기값
  }
  return 600; // SSR fallback
});

// 렌더링 시
style={{ 
  height: `${titleAnimationHeight - 50}px`, 
  minHeight: '400px',
  transition: 'height 0.2s ease-out' // 부드러운 전환
}}
```

### 3. 스크롤 위치 고려한 높이 계산

**핵심 개선사항:**
- 요소가 뷰포트에 보이는지 확인
- 보이지 않으면 이전 값 유지

**개선된 코드:**
```typescript
const calculateHeight = () => {
  if (!scrollDownRef.current) return;

  // 요소가 뷰포트에 보이는지 확인
  const rect = scrollDownRef.current.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
  
  // 요소가 보이지 않으면 이전 값 유지 (불필요한 재계산 방지)
  if (!isVisible && titleAnimationHeight !== null) {
    return;
  }

  // ... 나머지 계산 로직
};
```

### 4. TitleGradient와 TitleSection의 동기화

**핵심 개선사항:**
- Custom Event를 통한 컴포넌트 간 통신
- ResizeObserver가 자동으로 감지하도록 보장

**개선된 코드:**
```typescript
// TitleSection에서 높이 계산 완료 후 이벤트 발생
useEffect(() => {
  if (titleAnimationHeight !== null) {
    // Custom event로 TitleGradient에 알림
    window.dispatchEvent(new CustomEvent('titleHeightChanged', {
      detail: { height: titleAnimationHeight }
    }));
  }
}, [titleAnimationHeight]);

// TitleGradient에서 이벤트 수신 (선택적)
useEffect(() => {
  const handleTitleHeightChange = () => {
    // ResizeObserver가 자동으로 감지하므로 별도 처리 불필요
    // 하지만 명시적으로 알림을 받아서 처리할 수도 있음
  };
  
  window.addEventListener('titleHeightChanged', handleTitleHeightChange);
  return () => {
    window.removeEventListener('titleHeightChanged', handleTitleHeightChange);
  };
}, []);
```

### 5. Lenis 스크롤과의 동기화

**핵심 개선사항:**
- `requestAnimationFrame`을 사용하여 Lenis 업데이트 후 높이 계산

**개선된 코드:**
```typescript
useEffect(() => {
  const handleResize = () => {
    // Lenis가 스크롤을 업데이트한 후 높이 계산
    requestAnimationFrame(() => {
      calculateHeight();
    });
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

## 권장 해결책 (우선순위별)

### 1단계: 즉시 적용 가능한 개선사항 (High Priority)

1. **디바운싱 추가**
   - `TitleSection`의 `calculateHeight`에 150ms 디바운싱 추가
   - 불필요한 재계산 방지

2. **초기 높이 값 개선**
   - `null` 대신 계산된 초기값 사용
   - SSR 고려한 fallback 값 설정

3. **Transition 추가**
   - 높이 변경 시 부드러운 전환 효과
   - 깜빡임 최소화

### 2단계: 중기 개선사항 (Medium Priority)

1. **스크롤 위치 고려**
   - 요소가 뷰포트에 보이는지 확인
   - 보이지 않으면 이전 값 유지

2. **값 변경 임계값 설정**
   - 이전 값과 비교하여 10px 이상 변경될 때만 업데이트
   - 미세한 변경으로 인한 깜빡임 방지

### 3단계: 장기 개선사항 (Low Priority)

1. **컴포넌트 간 동기화**
   - Custom Event를 통한 통신
   - ResizeObserver와 window.resize 이벤트 통합

2. **중앙화된 resize 관리**
   - Context 또는 Hook을 통한 중앙 관리
   - 모든 resize 이벤트를 한 곳에서 처리

## 예상 효과

1. **깜빡임 제거**: 초기값 개선과 transition으로 부드러운 높이 변경
2. **정확한 높이 계산**: 스크롤 위치를 고려한 정확한 측정
3. **성능 향상**: 디바운싱과 불필요한 재계산 방지로 성능 개선
4. **안정성 향상**: 컴포넌트 간 동기화로 더 안정적인 동작

## 테스트 시나리오

1. 페이지를 스크롤하여 `TitleSection`이 뷰포트 밖으로 이동
2. 브라우저 창 크기를 조절 (resize)
3. 다시 스크롤을 위로 올려 `TitleSection`이 뷰포트에 나타남
4. 레이아웃이 정상적으로 유지되는지 확인
5. 높이 변경 시 깜빡임이 없는지 확인

## 참고 사항

- `ResizeObserver`는 뷰포트 밖의 요소도 감지하지만, 정확한 크기 측정을 위해서는 요소가 렌더링되어 있어야 함
- Lenis의 스크롤 관리와 React의 상태 업데이트가 비동기적으로 실행되므로 동기화가 중요
- 여러 컴포넌트가 독립적으로 resize를 처리하는 것은 성능과 안정성 측면에서 문제가 될 수 있음
- `offsetHeight`는 요소가 렌더링되어 있어야 정확한 값을 반환하므로, 뷰포트 밖에 있어도 측정 가능하지만 스크롤 후에는 재확인이 필요할 수 있음