# Contact Us - Supabase 연동 가이드

## 개요

Contact Us 페이지에서 문의하기 버튼을 클릭하면 Supabase의 `contacts` 테이블에 데이터가 저장됩니다.

## 설정 방법

### 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 로그인
2. 새 프로젝트 생성
3. 프로젝트 설정에서 다음 정보 확인:
   - Project URL (예: `https://xxxxx.supabase.co`)
   - API Keys > anon/public key

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Supabase 테이블 생성 및 RLS 설정

**중요: RLS 정책을 반드시 설정해야 합니다!**

Supabase 대시보드에서 다음 순서로 진행하세요:

#### 방법 1: SQL Editor 사용 (권장)

1. Supabase 대시보드 → SQL Editor 열기
2. 다음 SQL을 실행:

```sql
-- contacts 테이블 생성
CREATE TABLE IF NOT EXISTS contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  timeline TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 활성화
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 기존 정책이 있다면 삭제 (선택사항)
DROP POLICY IF EXISTS "Allow public insert" ON contacts;

-- 모든 사용자(anon)가 데이터를 삽입할 수 있도록 정책 생성
CREATE POLICY "Allow public insert" ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 인덱스 추가 (선택사항)
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
```

#### 방법 2: Table Editor + Authentication 사용

1. **Table Editor에서 테이블 생성:**
   - Table Editor → New Table → `contacts` 생성
   - 다음 컬럼 추가:
     - `id`: bigint, Primary Key, Auto-increment
     - `name`: text, Required
     - `email`: text, Required
     - `phone`: text, Nullable
     - `service`: text, Required
     - `timeline`: text, Nullable
     - `message`: text, Required
     - `created_at`: timestamptz, Default: `now()`

2. **RLS 정책 설정:**
   - Table Editor → `contacts` 테이블 선택
   - 우측 상단 "..." 메뉴 → "Edit RLS policies"
   - "New Policy" 클릭
   - Policy name: `Allow public insert`
   - Allowed operation: `INSERT`
   - Target roles: `anon`
   - USING expression: (비워두기)
   - WITH CHECK expression: `true`
   - "Review" → "Save policy"

### 4. RLS 정책 확인

RLS 정책이 제대로 설정되었는지 확인:

1. Table Editor → `contacts` 테이블
2. 우측 상단 "..." 메뉴 → "Edit RLS policies"
3. 다음 정책이 있는지 확인:
   - `Allow public insert` (INSERT, anon)

### 5. 테이블 구조

| 컬럼명 | 타입 | 제약조건 | 설명 |
|--------|------|----------|------|
| id | BIGSERIAL | PRIMARY KEY | 자동 증가 ID |
| name | TEXT | NOT NULL | 이름 |
| email | TEXT | NOT NULL | 이메일 |
| phone | TEXT | NULL | 전화번호 (선택사항) |
| service | TEXT | NOT NULL | 서비스 종류 (web, app, design, discuss) |
| timeline | TEXT | NULL | 프로젝트 기간 (선택사항) |
| message | TEXT | NOT NULL | 문의 내용 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 생성 일시 |

## 문제 해결

### RLS 정책 오류가 발생하는 경우

**에러 메시지:**
```
new row violates row-level security policy for table "contacts"
```

**해결 방법:**

1. **RLS가 활성화되어 있는지 확인:**
   ```sql
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE tablename = 'contacts';
   ```
   `rowsecurity`가 `true`여야 합니다.

2. **정책이 제대로 생성되었는지 확인:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'contacts';
   ```
   `Allow public insert` 정책이 있어야 합니다.

3. **정책 재생성:**
   ```sql
   -- 기존 정책 삭제
   DROP POLICY IF EXISTS "Allow public insert" ON contacts;
   
   -- 정책 재생성
   CREATE POLICY "Allow public insert" ON contacts
     FOR INSERT
     TO anon
     WITH CHECK (true);
   ```

4. **RLS를 일시적으로 비활성화 (개발 환경만):**
   ```sql
   ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;
   ```
   ⚠️ **주의:** 프로덕션에서는 RLS를 활성화하고 적절한 정책을 설정해야 합니다.

## 파일 구조

```
app/
  api/
    contact/
      route.ts          # API 라우트 (Supabase에 데이터 저장)
  contact/
    page.tsx            # Contact 페이지 컴포넌트
lib/
  supabase.ts           # Supabase 클라이언트 설정
```

## 사용 방법

1. 사용자가 Contact Us 페이지에서 폼 작성
2. "문의하기" 버튼 클릭
3. 폼 검증 통과 시 `/api/contact`로 POST 요청
4. API 라우트에서 Supabase의 `contacts` 테이블에 데이터 삽입
5. 성공 시 폼 초기화 및 성공 메시지 표시

## API 엔드포인트

### POST /api/contact

**Request Body:**
```json
{
  "name": "홍길동",
  "email": "hong@example.com",
  "phone": "010-1234-5678",
  "service": "web",
  "timeline": "1-3m",
  "message": "프로젝트 문의 내용"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "홍길동",
      "email": "hong@example.com",
      ...
    }
  ]
}
```

**Response (Error):**
```json
{
  "error": "에러 메시지",
  "details": "상세 에러 정보"
}
```

## 주의사항

1. 환경 변수는 반드시 `.env.local` 파일에 설정해야 합니다.
2. **Supabase RLS 정책을 반드시 설정해야 데이터 삽입이 가능합니다.**
3. 프로덕션 환경에서는 환경 변수를 Vercel 등의 플랫폼에 설정해야 합니다.
4. RLS를 비활성화하면 보안 문제가 발생할 수 있으므로, 적절한 정책을 설정하는 것이 좋습니다.

