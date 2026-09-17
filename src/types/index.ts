export interface QuizItem {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface ConceptDetail {
  topic: string;
  analogy: string; // 초보자 눈높이 비유
  summary: string[]; // 3줄 핵심 요약
  keyPoints: string[]; // 핵심 체크포인트
  coachTip: string; // AI 코치 팁
}

export interface Task {
  id: string;
  title: string;
  category: string;
  estimatedMinutes: number;
  difficulty: '초급' | '중급' | '고급';
  completed: boolean;
  concept: ConceptDetail;
  quiz: QuizItem[];
}

export interface DayPlan {
  dayOfWeek: string;
  dayNumber: number;
  dateStr: string;
  title: string;
  isToday: boolean;
  tasks: Task[];
}

export interface GoalPreset {
  id: string;
  name: string;
  defaultHours: string;
  description: string;
  days: DayPlan[];
}

