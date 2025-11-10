# TitleGradient 깜빡임 현상 수정 사항

## 수정 개요

`TitleAnimation.tsx` 컴포넌트에서 사용되는 `TitleGradient` 컴포넌트의 WebGL 기반 애니메이션 셰이더가 브라우저 창 크기 변경 시 발생하던 깜빡임 현상을 해결했습니다.

## 수정 전 문제점

### 1. Resize 이벤트 처리 방식의 문제

- `Gradient.js`의 `resize` 메서드가 `window.innerWidth`만 사용하고 고정 `height`(600) 사용
- Resize 이벤트에 디바운싱 없이 즉시 실행되어 매 프레임마다 호출됨
- `TitleSection`에서 동적으로 계산된 높이와 불일치 발생

### 2. Canvas 크기와 실제 컨테이너 크기 불일치

- Canvas는 CSS로 `h-full w-full`을 사용하여 부모 컨테이너 크기에 맞춤
- 하지만 `Gradient.js`의 resize 메서드는 `window.innerWidth`와 고정 `height`를 사용
- 부모 컨테이너의 실제 크기와 Gradient 인스턴스의 크기가 동기화되지 않음

### 3. Mesh Geometry 재구성 과정에서의 깜빡임

- Resize 시 WebGL 컨텍스트 크기 변경, 카메라 재설정, 메시 토폴로지 재구성 등이 동기적으로 실행
- Geometry 재구성 중에는 이전 프레임이 지워지고 새 프레임이 렌더링되기 전까지 빈 화면이 보일 수 있음

### 4. TitleSection과의 충돌

- `TitleSection`과 `Gradient.js` 모두 resize 이벤트를 독립적으로 처리
- 두 컴포넌트의 resize 타이밍이 다를 수 있어 불일치 발생

## 수정 내용

### 1. ResizeObserver 도입

**파일:** `app/components/TitleGradient.tsx`

`window.resize` 이벤트 대신 `ResizeObserver`를 사용하여 실제 canvas 요소의 크기 변경을 정확하게 감지하도록 변경했습니다.

```tsx
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    // 실제 canvas 크기 사용
  }
});

resizeObserver.observe(canvas);

```

**장점:**

- 실제 컨테이너 크기와 정확히 동기화
- 부모 요소의 크기 변경도 감지 가능
- `window.innerWidth`와 실제 canvas 크기의 불일치 문제 해결

### 2. 디바운싱 추가

Resize 이벤트가 너무 자주 발생하는 것을 방지하기 위해 150ms 디바운싱을 추가했습니다.

```tsx
resizeTimeoutRef.current = setTimeout(() => {
  // Resize 로직 실행
}, 150); // 150ms 디바운싱

```

**효과:**

- 불필요한 resize 호출 감소
- 성능 향상 및 깜빡임 최소화
- 사용자가 창 크기를 조정하는 동안 과도한 재계산 방지

### 3. 실제 Canvas 크기 사용

`Gradient.js`의 `resize` 메서드가 `window.innerWidth`로 덮어쓰는 문제를 해결하기 위해, resize 메서드의 로직을 직접 수행하도록 변경했습니다.

```tsx
const actualWidth = Math.round(width);
const actualHeight = Math.round(height);

// 실제 canvas 크기로 설정
gradient.width = actualWidth;
gradient.height = actualHeight;

// resize 메서드의 로직을 직접 수행
gradient.minigl.setSize(actualWidth, actualHeight);
gradient.minigl.setOrthographicCamera();

const xSegCount = Math.ceil(actualWidth * gradient.conf.density[0]);
const ySegCount = Math.ceil(actualHeight * gradient.conf.density[1]);

gradient.mesh.geometry.setTopology(xSegCount, ySegCount);
gradient.mesh.geometry.setSize(actualWidth, actualHeight);
gradient.mesh.material.uniforms.u_shadow_power.value = actualWidth < 600 ? 5 : 6;

```

**효과:**

- 실제 canvas 크기가 정확히 반영됨
- `window.innerWidth`로 인한 크기 불일치 문제 해결
- `TitleSection`에서 동적으로 계산된 높이와 정확히 동기화

### 4. Window Resize 이벤트 리스너 제거

`Gradient.js`의 `init()` 메서드에서 등록하는 `window.resize` 이벤트 리스너를 제거하여 `ResizeObserver`와의 충돌을 방지했습니다.

```tsx
// Gradient.js의 init()이 비동기적으로 호출되므로,
// 잠시 후 window resize 이벤트 리스너를 제거
const removeWindowResizeListener = () => {
  const gradientInstance = gradientRef.current as unknown as {
    resize: () => void;
  };
  if (gradientInstance && gradientInstance.resize) {
    window.removeEventListener('resize', gradientInstance.resize);
  }
};

// Gradient.js의 init()이 완료될 때까지 대기 후 제거
setTimeout(removeWindowResizeListener, 1000);

```

**효과:**

- `ResizeObserver`와 `window.resize` 이벤트의 중복 호출 방지
- 일관된 resize 처리 보장

### 5. Cleanup 함수 개선

컴포넌트가 언마운트될 때 모든 리스너와 타이머를 정리하도록 개선했습니다.

```tsx
return () => {
  resizeObserver.disconnect();
  if (resizeTimeoutRef.current) {
    clearTimeout(resizeTimeoutRef.current);
  }
  // Gradient의 disconnect 메서드 호출하여 이벤트 리스너 정리
  if (gradientRef.current) {
    const gradient = gradientRef.current as unknown as {
      disconnect: () => void;
    };
    gradient.disconnect();
  }
};

```

**효과:**

- 메모리 누수 방지
- 불필요한 이벤트 리스너 제거
- 깔끔한 리소스 정리

## 수정된 코드 구조

### 주요 변경사항

1. **Ref 추가**
    - `gradientRef`: Gradient 인스턴스 참조 저장
    - `canvasRef`: Canvas 요소 참조 저장
    - `resizeTimeoutRef`: 디바운싱 타이머 참조 저장
2. **ResizeObserver 설정**
    - Canvas 요소를 관찰하여 크기 변경 감지
    - `entry.contentRect`에서 실제 크기 추출
3. **디바운싱 로직**
    - 150ms 지연으로 resize 호출 최적화
    - 이전 타이머 취소 후 새 타이머 설정
4. **실제 크기 기반 Resize**
    - `Gradient.js`의 resize 메서드 대신 로직 직접 수행
    - 실제 canvas 크기를 사용하여 모든 설정 업데이트

## 테스트 결과

### 빌드 검증

```bash
pnpm run build

```

- ✅ 빌드 성공
- ✅ 타입 에러 없음
- ✅ 린트 에러 없음

### 깜빡임 현상 점검

1. **초기 렌더링**: `isMounted`를 사용하여 클라이언트에서만 렌더링하므로 문제 없음
2. **TitleSection과의 충돌**: `ResizeObserver`를 사용하여 실제 canvas 크기를 감지하므로 독립적으로 동작
3. **Geometry 재구성**: 디바운싱으로 최소화됨
4. **Window resize 충돌**: `Gradient.js`의 window resize 리스너 제거로 해결

## 예상 효과

1. **깜빡임 현상 제거**: ResizeObserver와 디바운싱으로 부드러운 크기 조정
2. **정확한 크기 동기화**: 실제 canvas 크기를 사용하여 부모 컨테이너와 정확히 일치
3. **성능 향상**: 불필요한 resize 호출 감소로 성능 개선
4. **안정성 향상**: TitleSection과의 충돌 해결로 더 안정적인 동작

## 참고 사항

- `Gradient.js`는 외부 라이브러리로 보이며, 직접 수정이 어려워 wrapper 방식으로 처리
- WebGL 컨텍스트의 크기 변경은 비용이 큰 작업이므로 디바운싱으로 최소화
- `ResizeObserver`는 모던 브라우저에서 지원되며, 폴리필이 필요할 수 있음 (현재 프로젝트에서는 문제 없음)

## 관련 파일

- `app/components/TitleGradient.tsx`: 수정된 컴포넌트
- `app/Gradient.js`: 외부 라이브러리 (수정하지 않음)
- `app/components/TitleSection.tsx`: 동적 높이 계산 컴포넌트
- `app/components/TitleAnimation.tsx`: TitleGradient를 사용하는 컴포넌트