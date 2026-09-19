import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, generateGeminiContent } from '@/lib/gemini';
import { getUpcoming7Days, formatKoreanToday } from '@/lib/dateUtils';
import { DayPlan } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { goal, hours, clientDate } = await req.json();

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

    // 1. 현재 실제 날짜 기준으로 7일 일정표를 정확히 사전 계산
    const baseDate = clientDate ? new Date(clientDate) : new Date();
    const scheduleDays = getUpcoming7Days(baseDate);
    const todayKorean = formatKoreanToday(baseDate);

    const scheduleListText = scheduleDays
      .map((d) => `- Day ${d.dayNumber}: ${d.dateStr} (${d.isToday ? '오늘 시작' : '예정'})`)
      .join('\n');

    const prompt = `당신은 최고 수준의 개인 맞춤형 AI 학습 코치입니다.
사용자의 학습 목표와 일일 가용 시간을 분석하여, 오늘부터 시작하는 최적의 7일 완성 주간 학습 계획을 수립해주세요.

[현재 기준 날짜]
- 오늘: ${todayKorean}
- 7일간의 실제 일정표:
${scheduleListText}

[사용자 입력]
- 학습 목표: "${goal}"
- 일일 학습 가능 시간: "${hours || '2시간'}"

[요구사항]
1. Day 1(오늘, ${scheduleDays[0].dateStr})부터 Day 7(${scheduleDays[6].dateStr})까지 순서대로 7일치 계획을 수립하세요.
2. Day 1이 오늘(isToday: true)이며, Day 2~7은 isToday: false입니다.
3. 각 일자마다:
   - dayNumber: 1~7
   - dayOfWeek: 해당 날짜의 요일("${scheduleDays[0].dayOfWeek}"부터 순서대로)
   - dateStr: 정확한 날짜 표기(예: "${scheduleDays[0].dateStr}")
   - title: 그 날 학습할 핵심 대표 주제
   - tasks: 1~3개의 실전적인 학습 태스크(Task)
4. 각 태스크마다:
   - topic에 대한 초보자 눈높이의 쉬운 비유(analogy)
   - 3줄 핵심 요약(summary, 3개 문자열 배열)
   - 시험/실무 핵심 체크포인트(keyPoints, 2개 문자열 배열)
   - AI 코치만의 족집게 팁(coachTip)
   - 5개의 고품질 4지선다형 객관식 퀴즈(quiz): 각 문항별 id(1~5), question(문제), options(4개 보기), answerIndex(0~3 정답 인덱스), explanation(친절하고 상세한 정답/오답 해설)
5. 반드시 지정된 JSON 포맷(배열)만을 순수 JSON으로 반환하세요. 마크다운 따옴표나 기타 설명 텍스트를 포함하지 마세요.

[반환 JSON 구조 예시]
[
  {
    "dayOfWeek": "${scheduleDays[0].dayOfWeek}",
    "dayNumber": 1,
    "dateStr": "${scheduleDays[0].dateStr}",
    "title": "1일차 대표 주제",
    "isToday": true,
    "tasks": [
      {
        "id": "task-d1-1",
        "title": "세부 학습 항목 제목",
        "category": "카테고리명",
        "estimatedMinutes": 30,
        "difficulty": "초급",
        "completed": false,
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
    const rawDays: DayPlan[] = JSON.parse(cleanedText);

    // 2. 날짜/요일 정확도 100% 보장: 사전 계산된 캘린더 날짜를 완벽하게 정합
    const finalizedDays: DayPlan[] = rawDays.map((day, idx) => {
      const schedule = scheduleDays[idx] || scheduleDays[scheduleDays.length - 1];
      return {
        ...day,
        dayNumber: schedule.dayNumber,
        dayOfWeek: schedule.dayOfWeek,
        dateStr: schedule.dateStr,
        isToday: schedule.isToday,
      };
    });

    return NextResponse.json({ days: finalizedDays, generatedBy: 'gemini' });
  } catch (error: unknown) {
    console.error('Plan generation error:', error);
    const errorMessage = error instanceof Error ? error.message : '계획 생성 중 오류가 발생했습니다.';
    return NextResponse.json(
      { error: 'GENERATION_FAILED', message: errorMessage },
      { status: 500 }
    );
  }
}
