import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, generateGeminiContent } from '@/lib/gemini';
import { QuizItem } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const { topic, goal } = await req.json();

    if (!topic || !topic.trim()) {
      return NextResponse.json({ error: '주제를 입력해주세요.' }, { status: 400 });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return NextResponse.json(
        {
          error: 'MISSING_API_KEY',
          message: '.env.local 파일에 GEMINI_API_KEY를 설정해주세요.',
        },
        { status: 400 }
      );
    }

    const prompt = `당신은 출제 위원급 AI 시험 코치입니다.
주제: "${topic}" ${goal ? `(학습 목표: ${goal})` : ''}

초보자가 학습 내용을 점검하고 시험에 확실히 대비할 수 있도록, 핵심을 찌르는 고품질 4지선다형 객관식 퀴즈 5문제를 출제해주세요.
각 문항은 기본 개념부터 실전 응용까지 단계별 난이도로 구성하세요.

반드시 아래 형식의 JSON 배열로만 응답하세요:
[
  {
    "id": 1,
    "question": "문제 내용",
    "options": ["보기 1", "보기 2", "보기 3", "보기 4"],
    "answerIndex": 0,
    "explanation": "정답인 이유와 오답인 이유를 명쾌하게 설명하는 해설"
  },
  {
    "id": 2,
    "question": "문제 내용",
    "options": ["보기 1", "보기 2", "보기 3", "보기 4"],
    "answerIndex": 1,
    "explanation": "상세한 해설"
  },
  {
    "id": 3,
    "question": "문제 내용",
    "options": ["보기 1", "보기 2", "보기 3", "보기 4"],
    "answerIndex": 2,
    "explanation": "상세한 해설"
  },
  {
    "id": 4,
    "question": "문제 내용",
    "options": ["보기 1", "보기 2", "보기 3", "보기 4"],
    "answerIndex": 3,
    "explanation": "상세한 해설"
  },
  {
    "id": 5,
    "question": "문제 내용",
    "options": ["보기 1", "보기 2", "보기 3", "보기 4"],
    "answerIndex": 0,
    "explanation": "상세한 해설"
  }
]`;

    const response = await generateGeminiContent(ai, prompt);

    const responseText = response.text || '';
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const quizzes: QuizItem[] = JSON.parse(cleanedText);

    return NextResponse.json({ quizzes });
  } catch (error: unknown) {
    console.error('Quiz generation error:', error);
    const errorMessage = error instanceof Error ? error.message : '퀴즈 출제 중 오류가 발생했습니다.';
    return NextResponse.json(
      { error: 'GENERATION_FAILED', message: errorMessage },
      { status: 500 }
    );
  }
}

