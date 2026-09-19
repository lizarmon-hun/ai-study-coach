'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Bot, Flame, KeyRound, Sparkles, X, CheckCircle2, CloudCheck } from 'lucide-react';
import { Header } from '../components/Header';
import { GoalPlanner } from '../components/GoalPlanner';
import { WeeklySchedule } from '../components/WeeklySchedule';
import { TodayTodoList } from '../components/TodayTodoList';
import { ConceptModal } from '../components/ConceptModal';
import { QuizModal } from '../components/QuizModal';
import { PlanHistoryModal } from '../components/PlanHistoryModal';
import { INITIAL_PRESETS } from '../data/mockData';
import { DayPlan, Task, ConceptDetail, QuizItem } from '../types';
import {
  SavedPlan,
  getActivePlan,
  getAllPlans,
  saveStudyPlan,
  updatePlanDays,
  setActivePlan,
  deletePlan,
  isSupabaseConfigured,
} from '../lib/supabase';

export default function Home() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('infosec');
  const [goal, setGoal] = useState<string>('정보처리기사 실기');
  const [hours, setHours] = useState<string>('2시간');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [apiKeyNotice, setApiKeyNotice] = useState<string | null>(null);
  const [generationSuccessNotice, setGenerationSuccessNotice] = useState<string | null>(null);
  
  // Weekly plans state
  const [days, setDays] = useState<DayPlan[]>(INITIAL_PRESETS[0].days);
  const initialTodayIndex = INITIAL_PRESETS[0].days.findIndex((d) => d.isToday);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(initialTodayIndex >= 0 ? initialTodayIndex : 0);

  // Persistence state
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isCloudSynced] = useState<boolean>(() => isSupabaseConfigured());

  // Modals state
  const [conceptTask, setConceptTask] = useState<Task | null>(null);
  const [quizTask, setQuizTask] = useState<Task | null>(null);

  // 1. Initial Mount: Load active plan & all saved plans from DB / localStorage
  useEffect(() => {
    async function loadData() {
      try {
        const [active, all] = await Promise.all([getActivePlan(), getAllPlans()]);
        setSavedPlans(all);

        if (active) {
          setCurrentPlanId(active.id);
          setGoal(active.goal);
          setHours(active.hours);
          setDays(active.days);
          const todayIdx = active.days.findIndex((d) => d.isToday);
          setSelectedDayIndex(todayIdx >= 0 ? todayIdx : 0);
        } else {
          // Initialize with default plan in DB/localStorage
          const initial = await saveStudyPlan(
            INITIAL_PRESETS[0].name,
            INITIAL_PRESETS[0].defaultHours,
            INITIAL_PRESETS[0].days
          );
          setCurrentPlanId(initial.id);
          setSavedPlans([initial]);
        }
      } catch (err) {
        console.warn('Initial plan load failed:', err);
      }
    }

    loadData();
  }, []);

  // Selected Day & Today
  const selectedDay = days[selectedDayIndex] || days[0];
  const todayDay = days.find((d) => d.isToday) || days[0];

  // Completed & Total tasks counts for Today
  const todayCompletedCount = todayDay.tasks.filter((t) => t.completed).length;
  const todayTotalCount = todayDay.tasks.length;

  // Toggle task status and sync to DB
  const handleToggleTask = (taskId: string) => {
    setDays((prevDays) => {
      const nextDays = prevDays.map((day) => ({
        ...day,
        tasks: day.tasks.map((task) => {
          if (task.id === taskId) {
            const nextCompleted = !task.completed;
            return { ...task, completed: nextCompleted };
          }
          return task;
        }),
      }));

      // Check if this action completed all tasks for today
      const updatedToday = nextDays.find((d) => d.isToday);
      if (updatedToday) {
        const completed = updatedToday.tasks.filter((t) => t.completed).length;
        const total = updatedToday.tasks.length;
        if (total > 0 && completed === total) {
          try {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 },
            });
          } catch {
            // ignore
          }
        }
      }

      // Sync to database
      if (currentPlanId) {
        updatePlanDays(currentPlanId, nextDays).then(() => {
          // refresh saved plans list in background
          getAllPlans().then(setSavedPlans);
        });
      }

      return nextDays;
    });
  };

  // Switch presets
  const handleSelectPreset = async (presetId: string) => {
    const found = INITIAL_PRESETS.find((p) => p.id === presetId);
    if (!found) return;
    setSelectedPresetId(presetId);
    setGoal(found.name);
    setHours(found.defaultHours);
    setDays(found.days);
    const todayIdx = found.days.findIndex((d) => d.isToday);
    setSelectedDayIndex(todayIdx >= 0 ? todayIdx : 0);
    setGenerationSuccessNotice(null);

    // Save as current active plan
    try {
      const saved = await saveStudyPlan(found.name, found.defaultHours, found.days);
      setCurrentPlanId(saved.id);
      const all = await getAllPlans();
      setSavedPlans(all);
    } catch (e) {
      console.warn('Preset save failed:', e);
    }
  };

  // Generate Weekly Plan using Gemini API (with Fallback & Auto-Save to Supabase)
  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    setApiKeyNotice(null);
    setGenerationSuccessNotice(null);

    let generatedDays: DayPlan[] | null = null;

    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, hours }),
      });

      const data = await res.json();

      if (res.ok && data.days && Array.isArray(data.days) && data.days.length > 0) {
        generatedDays = data.days;
        setGenerationSuccessNotice(`✨ Google Gemini AI가 '${goal}' 목표(${hours}/일)에 맞춘 실전 7일 주간 플랜을 성공적으로 생성 및 저장했습니다!`);
      } else if (data.error === 'MISSING_API_KEY') {
        setApiKeyNotice('💡 GEMINI_API_KEY가 아직 설정되지 않아 기본 템플릿(데모 모드)으로 플랜을 생성했습니다. .env.local 파일에 키를 입력하시면 Gemini AI가 실시간으로 완전 맞춤형 주간 플랜을 생성합니다.');
      } else {
        setApiKeyNotice(data.message || 'AI 플랜 생성 중 오류가 발생하여 기본 템플릿으로 대체되었습니다.');
      }
    } catch {
      setApiKeyNotice('네트워크 연결 문제로 인해 기본 템플릿으로 주간 플랜이 생성되었습니다.');
    }

    // Fallback: Generate template plan if Gemini didn't return days
    if (!generatedDays) {
      const matchedPreset = INITIAL_PRESETS.find((p) => p.name === goal || p.id === selectedPresetId);
      if (matchedPreset) {
        generatedDays = matchedPreset.days;
      } else {
        generatedDays = [
          {
            dayOfWeek: '월',
            dayNumber: 1,
            dateStr: '10.19 (월)',
            title: `${goal} 기초 개념 및 오리엔테이션`,
            isToday: false,
            tasks: [
              {
                id: 'custom-1-1',
                title: `${goal} 1단계: 핵심 용어 및 구조 파악`,
                category: '기초 입문',
                estimatedMinutes: 30,
                difficulty: '초급',
                completed: true,
                concept: {
                  topic: `${goal} 핵심 개요`,
                  analogy: '새로운 게임을 시작할 때 조작법과 룰북을 익히는 단계입니다.',
                  summary: [
                    '전체적인 출제/학습 흐름을 파악합니다.',
                    '가장 배점이 높은 핵심 영역을 먼저 선점합니다.',
                    '매일 작은 단위로 분할하여 반복 학습합니다.'
                  ],
                  keyPoints: ['목표 달성을 위한 일일 루틴 고정', '취약 영역 우선 배치'],
                  coachTip: '처음부터 완벽을 기하기보다 전체 뼈대를 빠르게 1회독하는 것이 효율적입니다.'
                },
                quiz: INITIAL_PRESETS[0].days[0].tasks[0].quiz
              }
            ]
          },
          {
            dayOfWeek: '화',
            dayNumber: 2,
            dateStr: '10.20 (화)',
            title: `${goal} 핵심 이론 집중 학습`,
            isToday: false,
            tasks: [
              {
                id: 'custom-2-1',
                title: `${goal} 2단계: 필수 핵심 원리 정리`,
                category: '이론 완성',
                estimatedMinutes: 40,
                difficulty: '초급',
                completed: true,
                concept: INITIAL_PRESETS[0].days[1].tasks[0].concept,
                quiz: INITIAL_PRESETS[0].days[1].tasks[0].quiz
              }
            ]
          },
          {
            dayOfWeek: '수',
            dayNumber: 3,
            dateStr: '10.21 (수)',
            title: `${goal} 실전 문제 풀이 및 심화`,
            isToday: true,
            tasks: [
              {
                id: 'custom-3-1',
                title: `${goal} 빈출 기출문제 10제 풀이`,
                category: '실전 적용',
                estimatedMinutes: 45,
                difficulty: '중급',
                completed: false,
                concept: INITIAL_PRESETS[0].days[2].tasks[0].concept,
                quiz: INITIAL_PRESETS[0].days[2].tasks[0].quiz
              },
              {
                id: 'custom-3-2',
                title: `${goal} 오답노트 작성 및 취약점 보완`,
                category: '약점 보완',
                estimatedMinutes: 30,
                difficulty: '중급',
                completed: false,
                concept: INITIAL_PRESETS[0].days[2].tasks[1].concept,
                quiz: INITIAL_PRESETS[0].days[2].tasks[1].quiz
              }
            ]
          },
          {
            dayOfWeek: '목',
            dayNumber: 4,
            dateStr: '10.22 (목)',
            title: `${goal} 심화 응용 테마 정복`,
            isToday: false,
            tasks: [
              {
                id: 'custom-4-1',
                title: `${goal} 고난도 단골 함정 유형 분석`,
                category: '심화 응용',
                estimatedMinutes: 40,
                difficulty: '중급',
                completed: false,
                concept: INITIAL_PRESETS[0].days[3].tasks[0].concept,
                quiz: INITIAL_PRESETS[0].days[3].tasks[0].quiz
              }
            ]
          },
          {
            dayOfWeek: '금',
            dayNumber: 5,
            dateStr: '10.23 (금)',
            title: `${goal} 실전 모의고사 1회`,
            isToday: false,
            tasks: [
              {
                id: 'custom-5-1',
                title: `${goal} 실전 타이머 모의평가`,
                category: '실전 감각',
                estimatedMinutes: 45,
                difficulty: '중급',
                completed: false,
                concept: INITIAL_PRESETS[0].days[4].tasks[0].concept,
                quiz: INITIAL_PRESETS[0].days[4].tasks[0].quiz
              }
            ]
          },
          {
            dayOfWeek: '토',
            dayNumber: 6,
            dateStr: '10.24 (토)',
            title: `${goal} 1주차 종합 복습`,
            isToday: false,
            tasks: [
              {
                id: 'custom-6-1',
                title: `${goal} 전체 핵심 키워드 마인드맵`,
                category: '총정리',
                estimatedMinutes: 40,
                difficulty: '초급',
                completed: false,
                concept: INITIAL_PRESETS[0].days[5].tasks[0].concept,
                quiz: INITIAL_PRESETS[0].days[5].tasks[0].quiz
              }
            ]
          },
          {
            dayOfWeek: '일',
            dayNumber: 7,
            dateStr: '10.25 (일)',
            title: `${goal} 주간 피드백 및 다음 주 플래닝`,
            isToday: false,
            tasks: [
              {
                id: 'custom-7-1',
                title: `${goal} 학습 달성률 점검 및 피드백`,
                category: '주간 회고',
                estimatedMinutes: 30,
                difficulty: '초급',
                completed: false,
                concept: INITIAL_PRESETS[0].days[6].tasks[0].concept,
                quiz: INITIAL_PRESETS[0].days[6].tasks[0].quiz
              }
            ]
          }
        ];
      }
    }

    setDays(generatedDays);
    const todayIdx = generatedDays.findIndex((d) => d.isToday);
    setSelectedDayIndex(todayIdx >= 0 ? todayIdx : 0);

    // Save to Database (Supabase / LocalStorage)
    try {
      const saved = await saveStudyPlan(goal, hours, generatedDays);
      setCurrentPlanId(saved.id);
      const all = await getAllPlans();
      setSavedPlans(all);
    } catch (e) {
      console.warn('Auto save plan failed:', e);
    }

    setIsGenerating(false);
  };

  // Add custom task to current day and persist
  const handleAddTask = (title: string, category: string, minutes: number) => {
    const newTask: Task = {
      id: `task-custom-${Date.now()}`,
      title,
      category,
      estimatedMinutes: minutes,
      difficulty: '중급',
      completed: false,
      concept: {
        topic: title,
        analogy: '이 주제는 실무와 시험에서 매우 유용하게 응용되는 필수적인 기초 지식입니다.',
        summary: [
          `${title}의 핵심 정의를 머릿속에 도식화합니다.`,
          '예제 코드 또는 시나리오를 통해 작동 원리를 검증합니다.',
          '자주 발생하는 에러나 함정 포인트를 체크합니다.'
        ],
        keyPoints: [
          '개념의 목적과 도입 배경 이해하기',
          '실제 기출 문제 및 실무 적용 사례와 연결하기'
        ],
        coachTip: 'AI 코치가 제안하는 팁: 먼저 전체 흐름을 가볍게 파악한 뒤 세부 사항을 암기하세요!'
      },
      quiz: INITIAL_PRESETS[0].days[2].tasks[0].quiz
    };

    setDays((prevDays) => {
      const nextDays = prevDays.map((d, idx) => {
        if (idx === selectedDayIndex) {
          return {
            ...d,
            tasks: [...d.tasks, newTask]
          };
        }
        return d;
      });

      if (currentPlanId) {
        updatePlanDays(currentPlanId, nextDays).then(() => {
          getAllPlans().then(setSavedPlans);
        });
      }

      return nextDays;
    });
  };

  // Keep modified concept/quiz in current days state & sync
  const handleUpdateTaskConcept = (taskId: string, updatedConcept: ConceptDetail) => {
    setDays((prev) => {
      const nextDays = prev.map((d) => ({
        ...d,
        tasks: d.tasks.map((t) => (t.id === taskId ? { ...t, concept: updatedConcept } : t)),
      }));
      if (currentPlanId) {
        updatePlanDays(currentPlanId, nextDays);
      }
      return nextDays;
    });
  };

  const handleUpdateTaskQuizzes = (taskId: string, updatedQuizzes: QuizItem[]) => {
    setDays((prev) => {
      const nextDays = prev.map((d) => ({
        ...d,
        tasks: d.tasks.map((t) => (t.id === taskId ? { ...t, quiz: updatedQuizzes } : t)),
      }));
      if (currentPlanId) {
        updatePlanDays(currentPlanId, nextDays);
      }
      return nextDays;
    });
  };

  // Switch to a plan from History
  const handleSelectSavedPlan = async (plan: SavedPlan) => {
    setCurrentPlanId(plan.id);
    setGoal(plan.goal);
    setHours(plan.hours);
    setDays(plan.days);
    const todayIdx = plan.days.findIndex((d) => d.isToday);
    setSelectedDayIndex(todayIdx >= 0 ? todayIdx : 0);
    await setActivePlan(plan.id);
    const all = await getAllPlans();
    setSavedPlans(all);
  };

  // Delete plan from History
  const handleDeleteSavedPlan = async (id: string) => {
    await deletePlan(id);
    const all = await getAllPlans();
    setSavedPlans(all);
    if (currentPlanId === id) {
      if (all.length > 0) {
        handleSelectSavedPlan(all[0]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Sticky Header */}
      <Header
        currentGoal={goal}
        dailyHours={hours}
        completedTasksCount={todayCompletedCount}
        totalTasksCount={todayTotalCount}
        onOpenHistory={() => setIsHistoryOpen(true)}
        savedPlansCount={savedPlans.length}
        isCloudSynced={isCloudSynced}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* API Key Notice Banner (if applicable) */}
        {apiKeyNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 flex items-start justify-between gap-3 text-xs sm:text-sm animate-in fade-in duration-300">
            <div className="flex items-start space-x-2.5">
              <KeyRound className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{apiKeyNotice}</p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  Google AI Studio (<a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="underline font-bold">https://aistudio.google.com/</a>)에서 무료 키를 발급받아 프로젝트 루트의 <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded font-mono">.env.local</code> 파일의 <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded font-mono">GEMINI_API_KEY=</code> 뒤에 붙여넣으시면 됩니다.
                </p>
              </div>
            </div>
            <button
              onClick={() => setApiKeyNotice(null)}
              className="p-1 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900 text-amber-600 transition-colors cursor-pointer"
              aria-label="알림 닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* AI Generation Success Notice Banner */}
        {generationSuccessNotice && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center justify-between gap-3 text-xs sm:text-sm animate-in fade-in duration-300">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="font-semibold">{generationSuccessNotice}</p>
            </div>
            <button
              onClick={() => setGenerationSuccessNotice(null)}
              className="p-1 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-600 transition-colors cursor-pointer"
              aria-label="알림 닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top AI Coach Greeting Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-transparent border border-indigo-100 dark:border-indigo-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>Google Gemini & Supabase AI 코치</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    <Sparkles className="w-2.5 h-2.5 mr-1" />
                    Gemini Flash
                  </span>
                </h2>
                {isCloudSynced && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <CloudCheck className="w-3 h-3" />
                    클라우드 저장 활성화
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                오늘의 핵심은 <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{todayDay.title}</strong>입니다. 태스크 완료 시 자동으로 상태가 저장되며, 상단 [내 플랜]에서 언제든 이전 기록을 확인하실 수 있습니다!
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 shrink-0">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>학습 진도 실시간 저장 중</span>
          </div>
        </div>

        {/* 1. Goal & Time Input Planner with Progress Bar */}
        <GoalPlanner
          goal={goal}
          setGoal={setGoal}
          hours={hours}
          setHours={setHours}
          onGeneratePlan={handleGeneratePlan}
          isGenerating={isGenerating}
          completedTasksCount={todayCompletedCount}
          totalTasksCount={todayTotalCount}
          onSelectPreset={handleSelectPreset}
        />

        {/* 2. Main: Weekly Schedule Cards View */}
        <WeeklySchedule
          days={days}
          selectedDayIndex={selectedDayIndex}
          onSelectDay={(idx) => setSelectedDayIndex(idx)}
        />

        {/* 3. Main: Selected/Today Checklist */}
        <TodayTodoList
          tasks={selectedDay.tasks}
          onToggleTask={handleToggleTask}
          onOpenConcept={(task) => setConceptTask(task)}
          onOpenQuiz={(task) => setQuizTask(task)}
          onAddTask={handleAddTask}
          dayTitle={`${selectedDay.dayOfWeek}요일 (${selectedDay.dateStr}) - ${selectedDay.title}`}
          isToday={selectedDay.isToday}
        />
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/70 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
        <p>AI 학습·습관 코치 웹앱 (AI Study & Habit Coach) • Powered by Google Gemini & PostgreSQL</p>
      </footer>

      {/* Interactive Modal 1: Beginner Concept Explanation */}
      <ConceptModal
        key={conceptTask?.id || 'concept-modal'}
        isOpen={Boolean(conceptTask)}
        onClose={() => setConceptTask(null)}
        concept={conceptTask?.concept || null}
        goal={goal}
        onOpenQuiz={() => {
          if (conceptTask) {
            const current = conceptTask;
            setConceptTask(null);
            setQuizTask(current);
          }
        }}
        onUpdateConcept={(updated) => {
          if (conceptTask) {
            handleUpdateTaskConcept(conceptTask.id, updated);
          }
        }}
      />

      {/* Interactive Modal 2: 5-Question Quiz */}
      <QuizModal
        key={quizTask?.id || 'quiz-modal'}
        isOpen={Boolean(quizTask)}
        onClose={() => setQuizTask(null)}
        topicTitle={quizTask?.title || ''}
        quizzes={quizTask?.quiz || []}
        goal={goal}
        onUpdateQuizzes={(updated) => {
          if (quizTask) {
            handleUpdateTaskQuizzes(quizTask.id, updated);
          }
        }}
        onFinishQuiz={(score) => {
          if (quizTask && score >= 3 && !quizTask.completed) {
            handleToggleTask(quizTask.id);
          }
        }}
      />

      {/* Plan History Vault Modal */}
      <PlanHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        plans={savedPlans}
        activePlanId={currentPlanId}
        onSelectPlan={handleSelectSavedPlan}
        onDeletePlan={handleDeleteSavedPlan}
      />
    </div>
  );
}
