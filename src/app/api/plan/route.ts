import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, generateGeminiContent } from '@/lib/gemini';
import { DayPlan } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { goal, hours } = await req.json();

    if (!goal || !goal.trim()) {
      return NextResponse.json({ error: '목표를 입력해주세요.' }, { status: 400 });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return NextResponse.json(
        {
          error: 'MISSING_API_KEY',
          message: '.env.local 파일에 GEMINI_API_KEY를 입력해주세요. 현재는 데모 모드로 작동합니다.',
        },
        { status: 400 }
      );
    }

    const prompt = `당신은 최고 수준의 개인 맞춤형 AI 학습 코치입니다.
사용자의 학습 목표와 일일 가용 시간을 분석하여 최적의 7일 완성(월~일, Day 1~7) 주간 학습 계획을 수립해주세요.

[사용자 입력]
- 학습 목표: "${goal}"
- 일일 학습 가능 시간: "${hours || '2시간'}"

[요구사항]
1. 총 7일치(Day 1부터 Day 7까지) 계획을 수립하세요.
2. 요일(dayOfWeek)은 순서대로 "월", "화", "수", "목", "금", "토", "일"로 설정하세요.
3. Day 3(수요일)을 오늘(isToday: true)로 지정하고, 나머지는 isToday: false로 지정하세요. Day 1과 Day 2의 태스크 중 일부(1~2개)는 이미 학습을 시작한 느낌을 주도록 completed: true로 설정해도 좋습니다.
4. 매일 1~3개의 구체적이고 실전적인 학습 태스크(Task)를 배정하세요.
5. 각 태스크마다:
   - topic에 대한 초보자 눈높이의 쉬운 비유(analogy)
   - 3줄 핵심 요약(summary, 3개 문자열 배열)
   - 시험/실무 핵심 체크포인트(keyPoints, 2개 문자열 배열)
   - AI 코치만의 족집게 팁(coachTip)
   - 5개의 고품질 4지선다형 객관식 퀴즈(quiz): 각 문항별 id(1~5), question(문제), options(4개 보기), answerIndex(0~3 정답 인덱스), explanation(친절하고 상세한 정답/오답 해설)
6. 반드시 지정된 JSON 포맷(배열)만을 순수 JSON으로 반환하세요. 마크다운 따옴표나 기타 설명 텍스트를 포함하지 마세요.

[반환 JSON 구조]
[
  {
    "dayOfWeek": "월",
    "dayNumber": 1,
    "dateStr": "Day 1 (월)",
    "title": "1일차 대표 주제",
    "isToday": false,
    "tasks": [
      {
        "id": "task-d1-1",
        "title": "세부 학습 항목 제목",
        "category": "카테고리명",
        "estimatedMinutes": 30,
        "difficulty": "초급",
        "completed": true,
        "concept": {
          "topic": "주제명",
          "analogy": "쉬운 실생활 비유",
          "summary": ["요약 1", "요약 2", "요약 3"],
          "keyPoints": ["포인트 1", "포인트 2"],
          "coachTip": "코치의 꿀팁"
        },
        "quiz": [
          {
            "id": 1,
            "question": "문제 내용",
            "options": ["보기1", "보기2", "보기3", "보기4"],
            "answerIndex": 0,
            "explanation": "상세한 해설"
          }
        ]
      }
    ]
  }
]`;

    const response = await generateGeminiContent(ai, prompt);

    const responseText = response.text || '';
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const days: DayPlan[] = JSON.parse(cleanedText);

    return NextResponse.json({ days, generatedBy: 'gemini' });
  } catch (error: unknown) {
    console.error('Plan generation error:', error);
    const errorMessage = error instanceof Error ? error.message : '계획 생성 중 오류가 발생했습니다.';
    return NextResponse.json(
      { error: 'GENERATION_FAILED', message: errorMessage },
      { status: 500 }
    );
  }
}

