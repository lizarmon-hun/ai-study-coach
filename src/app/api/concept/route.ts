import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient, generateGeminiContent } from '@/lib/gemini';
import { ConceptDetail } from '@/types';

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

    const prompt = `당신은 비전공자나 초보자도 한 번에 이해시키는 최고의 명강사 AI 학습 코치입니다.
주제: "${topic}" ${goal ? `(목표: ${goal})` : ''}

다음 형식의 JSON으로만 응답해 주세요:
{
  "topic": "${topic}",
  "analogy": "비전공자/초보자가 무릎을 탁 칠만한 흥미롭고 직관적인 실생활 비유 (2~3문장)",
  "summary": [
    "핵심 요약 첫 번째 문장",
    "핵심 요약 두 번째 문장",
    "핵심 요약 세 번째 문장"
  ],
  "keyPoints": [
    "시험이나 실무에서 반드시 기억해야 할 핵심 체크포인트 1",
    "시험이나 실무에서 반드시 기억해야 할 핵심 체크포인트 2"
  ],
  "coachTip": "AI 코치가 알려주는 실전 암기 비법이나 시험 족집게 팁"
}`;

    const response = await generateGeminiContent(ai, prompt);

    const responseText = response.text || '';
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const concept: ConceptDetail = JSON.parse(cleanedText);

    return NextResponse.json({ concept });
  } catch (error: unknown) {
    console.error('Concept generation error:', error);
    const errorMessage = error instanceof Error ? error.message : '개념 설명 생성 중 오류가 발생했습니다.';
    return NextResponse.json(
      { error: 'GENERATION_FAILED', message: errorMessage },
      { status: 500 }
    );
  }
}

