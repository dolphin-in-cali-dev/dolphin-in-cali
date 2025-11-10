-- Contact 테이블에 더미 데이터 삽입/업데이트 (UPSERT)
-- 주의: 이름과 이메일은 마스킹 없이 원본으로 저장 (프론트엔드에서 마스킹 처리)
-- email을 기준으로 중복 체크: 있으면 업데이트, 없으면 삽입

-- 1단계: email에 unique constraint 추가 (이미 있다면 에러 무시)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'contacts_email_unique'
  ) THEN
    ALTER TABLE contacts ADD CONSTRAINT contacts_email_unique UNIQUE (email);
  END IF;
END $$;

-- 2단계: UPSERT 실행
INSERT INTO contacts (name, email, phone, service, timeline, message, created_at) VALUES
('김민수', 'kim1234@naver.com', '010-1234-5678', 'web', '3-6m', '이커머스 플랫폼 개발 문의드립니다. 기존 쇼핑몰을 리뉴얼하고 싶어요.', '2025-11-10'),
('이지희', 'lee5678@gmail.com', '010-2345-6789', 'app', '1-3m', '모바일 앱 UI/UX 디자인 및 개발이 필요합니다. 사용자 경험을 중시하고 싶어요.', '2025-11-05'),
('박준수', 'park9012@naver.com', '010-3456-7890', 'web', '6-12m', '기업용 대시보드 시스템 구축을 원합니다. 실시간 데이터 시각화가 필요해요.', '2025-10-25'),
('최수은', 'choi3456@gmail.com', '010-4567-8901', 'design', 'under-1m', '소셜 네트워킹 앱 개발 프로젝트입니다. 브랜드 아이덴티티 디자인도 함께 진행하고 싶습니다.', '2025-10-15'),
('정민현', 'jung7890@gmail.com', '010-5678-9012', 'web', 'discuss', '온라인 쇼핑몰 리뉴얼 프로젝트 문의드립니다. 반응형 디자인이 중요합니다.', '2025-10-01')
ON CONFLICT (email) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  service = EXCLUDED.service,
  timeline = EXCLUDED.timeline,
  message = EXCLUDED.message,
  created_at = EXCLUDED.created_at;

