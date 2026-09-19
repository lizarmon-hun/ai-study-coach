# 🎓 AI 학습·습관 코치 (AI Study & Habit Coach)

> **Google Gemini Flash AI**와 **Supabase(클라우드 PostgreSQL)** 기반의 초개인화 학습 플래너 & 습관 메이커 웹 애플리케이션입니다.

---

## 🌟 주요 기능 (Key Features)

1. **AI 맞춤형 주간 플랜 생성**:
   - 목표(예: 정보처리기사, AWS 자격증, 토익)와 일일 가능 시간(1~4시간) 입력 시, Gemini AI가 7일 완성 커리큘럼을 실시간으로 설계
2. **실시간 진도 체크리스트 & 프로그레스 바**:
   - 일일 학습 태스크 체크 시 취소선 및 상단 진행률 프로그레스 바 실시간 반영
   - 전체 달성 시 축하 컨페티 애니메이션 발동
3. **초보자 눈높이 개념 설명 모달**:
   - 1분 만에 이해하는 실생활 비유, 3줄 핵심 요약, 시험 핵심 체크포인트, AI 코치 팁 제공
4. **인터랙티브 5문항 퀴즈 모달**:
   - 주제별 객관식 퀴즈 5문항, 정답/오답 즉각 판정 및 상세 해설 제공, 점수 관리
5. **클라우드 PostgreSQL (Supabase) 영구 저장 & 보관함**:
   - 내가 만든 플랜과 체크 현황이 실시간으로 DB에 자동 동기화
   - **[내 플랜]** 보관함에서 과거에 생성한 다양한 목표 플랜을 언제든 원클릭으로 복원하여 이어서 학습 가능
   - *(Supabase 미설정 시에도 브라우저 localStorage로 안전하게 자동 폴백 보존)*

---

## 🛠 기술 스택 (Tech Stack)

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide React 아이콘
- **AI Engine**: Google Gemini API (`@google/genai`, `gemini-3.5-flash` / `gemini-3.5-flash-lite`)
- **Database**: Supabase (Cloud PostgreSQL with JSONB) / LocalStorage Fallback

---

## 🚀 시작하기 (Getting Started)

### 1. 패키지 설치
```bash
npm install
```

### 2. 환경변수 설정 (`.env.local`)
프로젝트 루트에 `.env.local` 파일을 생성하고 아래 키를 입력합니다:

```env
# Google Gemini API Key (https://aistudio.google.com/ 에서 무료 발급)
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase 클라우드 DB 설정 (https://supabase.com/ 대시보드 API에서 확인)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 사용합니다.

---

## 📜 Supabase DB 테이블 생성 SQL

Supabase의 SQL Editor에서 아래 쿼리를 1회 실행하여 테이블을 생성합니다:

```sql
CREATE TABLE IF NOT EXISTS study_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal TEXT NOT NULL,
  hours TEXT NOT NULL,
  days JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read and write for anon" ON study_plans
  FOR ALL
  USING (true)
  WITH CHECK (true);
```
