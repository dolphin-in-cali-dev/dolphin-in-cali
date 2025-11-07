# TitleSection 반응형 높이 조정 기능 개발 로직

## 개요

`TitleSection` 컴포넌트에서 브라우저 뷰포트 높이에 맞춰 `TitleAnimation`과 `ScrollDownInstruction`이 화면을 꽉 채우도록 구현한 기능의 상세 개발 로직을 설명합니다.

## 요구사항

- `ScrollDownInstruction`은 원래 크기 그대로 유지
- `TitleAnimation`의 높이를 브라우저 뷰포트 높이를 기준으로 동적으로 계산
- 화면 크기 변경 시 실시간으로 높이 재조정
- 최소 높이 보장으로 레이아웃 깨짐 방지

## 구현 방식

### 1. 컴포넌트 구조

```tsx
TitleSection (컨테이너)
├── TitleAnimation (동적 높이 적용)
└── ScrollDownInstruction (고정 높이)
```

### 2. 높이 계산 공식

```
TitleAnimation 높이 = 뷰포트 높이 - ScrollDownInstruction 높이 - gap - padding
```

### 3. 주요 구현 단계

#### 3.1 상태 관리

```tsx
const [titleAnimationHeight, setTitleAnimationHeight] = useState<number | null>(null);
const scrollDownRef = useRef<HTMLDivElement>(null);
const containerRef = useRef<HTMLDivElement>(null);
```

- `titleAnimationHeight`: 계산된 `TitleAnimation`의 높이를 저장
- `scrollDownRef`: `ScrollDownInstruction` 요소의 참조 (높이 측정용)
- `containerRef`: 컨테이너 요소의 참조

#### 3.2 높이 계산 함수

```tsx
const calculateHeight = () => {
  // 1. 뷰포트 높이 측정
  const viewportHeight = window.innerHeight;
  
  // 2. ScrollDownInstruction의 실제 높이 측정
  const scrollDownHeight = scrollDownRef.current.offsetHeight;
  
  // 3. 반응형 gap 값 계산
  const gap = window.innerWidth >= 1024 ? 24 : 
              window.innerWidth >= 640 ? 20 : 16;
  
  // 4. 컨테이너 padding 값
  const containerPaddingBottom = 24; // pb-6
  
  // 5. 최종 높이 계산
  const calculatedHeight = viewportHeight - scrollDownHeight - gap - containerPaddingBottom;
  
  // 6. 최소 높이 보장 (300px)
  setTitleAnimationHeight(Math.max(calculatedHeight, 300));
};
```

**계산 과정 상세 설명:**

1. **뷰포트 높이 측정**: `window.innerHeight`로 현재 브라우저 창의 높이를 픽셀 단위로 가져옵니다.

2. **ScrollDownInstruction 높이 측정**: 
   - `scrollDownRef.current.offsetHeight`를 사용하여 실제 렌더링된 높이를 측정합니다.
   - 이 값은 텍스트 크기, 아이콘 크기, padding 등에 따라 달라질 수 있습니다.

3. **반응형 gap 값**:
   - 모바일 (기본): `gap-y-4` = 16px
   - 태블릿 (sm, 640px 이상): `gap-y-5` = 20px
   - 데스크톱 (lg, 1024px 이상): `gap-y-6` = 24px

4. **컨테이너 padding**: 
   - 하단 padding `pb-6` = 24px (모바일)
   - 반응형으로 `sm:pb-5` = 20px, `lg:pb-6` = 24px

5. **최종 계산**: 
   - 뷰포트 높이에서 ScrollDownInstruction 높이, gap, padding을 모두 빼서 TitleAnimation에 할당할 높이를 계산합니다.
   - `Math.max()`를 사용하여 최소 300px을 보장합니다.

#### 3.3 useEffect 훅

```tsx
useEffect(() => {
  // 초기 계산
  calculateHeight();

  // 리사이즈 이벤트 리스너 등록
  window.addEventListener('resize', calculateHeight);

  // 렌더링 완료 후 재계산 (DOM이 완전히 렌더링된 후)
  const timeoutId = setTimeout(calculateHeight, 100);

  return () => {
    window.removeEventListener('resize', calculateHeight);
    clearTimeout(timeoutId);
  };
}, []);
```

**동작 원리:**

1. **초기 계산**: 컴포넌트가 마운트되면 즉시 높이를 계산합니다.

2. **리사이즈 이벤트**: 브라우저 창 크기가 변경될 때마다 높이를 재계산합니다.

3. **지연 재계산**: 
   - `setTimeout`을 사용하여 100ms 후에 다시 계산합니다.
   - 이는 ScrollDownInstruction이 완전히 렌더링되고 높이가 확정된 후 정확한 값을 얻기 위함입니다.

4. **클린업**: 
   - 컴포넌트가 언마운트될 때 이벤트 리스너와 타이머를 정리합니다.

#### 3.4 렌더링

```tsx
<div
  style={
    titleAnimationHeight !== null
      ? { height: `${titleAnimationHeight}px`, minHeight: '300px' }
      : { minHeight: '300px' }
  }
>
  <TitleAnimation />
</div>
```

**스타일 적용:**

- `titleAnimationHeight`가 계산되면 해당 높이를 적용합니다.
- 계산 전에는 최소 높이만 적용하여 레이아웃이 깨지지 않도록 합니다.
- `TitleAnimation`은 `h-full`로 설정되어 있어 부모의 높이를 모두 사용합니다.

## 반응형 처리

### 브레이크포인트별 gap 값

| 화면 크기 | Tailwind 클래스 | 실제 값 | 조건 |
|----------|----------------|--------|------|
| 모바일 | `gap-y-4` | 16px | `window.innerWidth < 640` |
| 태블릿 | `gap-y-5` | 20px | `640px <= window.innerWidth < 1024` |
| 데스크톱 | `gap-y-6` | 24px | `window.innerWidth >= 1024` |

### 브레이크포인트별 padding 값

| 화면 크기 | Tailwind 클래스 | 실제 값 |
|----------|----------------|--------|
| 모바일 | `pb-6` | 24px |
| 태블릿 | `sm:pb-5` | 20px |
| 데스크톱 | `lg:pb-6` | 24px |

## 성능 최적화

### 1. 이벤트 리스너 최적화

- `resize` 이벤트는 필수적이지만, 과도한 호출을 방지하기 위해 debounce를 고려할 수 있습니다.
- 현재 구현은 즉시 반응하지만, 성능 이슈가 발생하면 debounce를 추가할 수 있습니다.

### 2. 계산 최적화

- `offsetHeight`는 리플로우를 발생시키므로, 필요한 경우에만 호출합니다.
- `useEffect`의 의존성 배열이 비어있어 불필요한 재계산을 방지합니다.

### 3. 메모이제이션

- 현재는 매번 계산하지만, 이전 값과 비교하여 변경이 없으면 업데이트를 건너뛸 수 있습니다.

```tsx
// 개선 예시
const prevHeight = useRef<number | null>(null);
if (calculatedHeight !== prevHeight.current) {
  setTitleAnimationHeight(calculatedHeight);
  prevHeight.current = calculatedHeight;
}
```

## 주의사항

### 1. 초기 렌더링

- `ScrollDownInstruction`이 아직 렌더링되지 않았을 때 `offsetHeight`가 0이 될 수 있습니다.
- 이를 해결하기 위해 `setTimeout`으로 지연 계산을 수행합니다.

### 2. 최소 높이 보장

- 계산된 높이가 너무 작아지면 레이아웃이 깨질 수 있으므로 최소 300px을 보장합니다.

### 3. SSR (Server-Side Rendering)

- `window` 객체는 서버에서 사용할 수 없으므로, `'use client'` 지시어를 사용하여 클라이언트 컴포넌트로 만듭니다.
- 초기 상태는 `null`로 설정하여 서버 렌더링 시 에러를 방지합니다.

## 테스트 시나리오

### 1. 정상 동작 확인

- [ ] 페이지 로드 시 TitleAnimation이 화면을 꽉 채움
- [ ] ScrollDownInstruction이 하단에 정상적으로 표시됨
- [ ] 브라우저 창 크기 변경 시 높이가 재계산됨
- [ ] 모바일, 태블릿, 데스크톱에서 모두 정상 동작

### 2. 엣지 케이스

- [ ] 매우 작은 화면 (300px 미만)에서도 최소 높이 보장
- [ ] 매우 큰 화면에서도 정상 동작
- [ ] 빠른 리사이즈 시에도 레이아웃이 깨지지 않음

## 향후 개선 사항

1. **Debounce 추가**: 리사이즈 이벤트에 debounce를 적용하여 성능 개선
2. **ResizeObserver 사용**: `window.resize` 대신 `ResizeObserver`를 사용하여 더 정확한 측정
3. **애니메이션 추가**: 높이 변경 시 부드러운 전환 효과
4. **타입 안정성**: 높이 계산 로직을 별도 유틸 함수로 분리하여 테스트 용이성 향상

## 참고 자료

- [React Hooks - useEffect](https://react.dev/reference/react/useEffect)
- [Tailwind CSS - Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [MDN - window.innerHeight](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight)
- [MDN - HTMLElement.offsetHeight](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight)

