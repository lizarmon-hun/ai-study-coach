'use client';

import React from 'react';
import { Target, Clock, Wand2, CheckCircle, RefreshCw, Trophy } from 'lucide-react';
import { INITIAL_PRESETS } from '../data/mockData';

interface GoalPlannerProps {
  goal: string;
  setGoal: (goal: string) => void;
  hours: string;
  setHours: (hours: string) => void;
  onGeneratePlan: () => void;
  isGenerating: boolean;
  completedTasksCount: number;
  totalTasksCount: number;
  onSelectPreset: (presetId: string) => void;
}

export const GoalPlanner: React.FC<GoalPlannerProps> = ({
  goal,
  setGoal,
  hours,
  setHours,
  onGeneratePlan,
  isGenerating,
  completedTasksCount,
  totalTasksCount,
  onSelectPreset,
}) => {
  const percentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 mb-6 sm:mb-8 transition-all">
      {/* Top Banner / Introduction */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
              AI 습관 & 플래닝 엔진
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              학습자 맞춤형 주간 최적화
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
            어떤 목표를 달성하고 싶으신가요?
          </h1>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">추천 프리셋:</span>
          {INITIAL_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              type="button"
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                goal === preset.name
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form & Action */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Goal Input */}
        <div className="md:col-span-6">
          <label htmlFor="goal-input" className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            달성 목표 (자격증, 시험, 공부 주제)
          </label>
          <div className="relative">
            <input
              id="goal-input"
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="예: 정보처리기사 실기, 토익 850, React 완전정복"
              className="w-full pl-3.5 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Daily Time Input */}
        <div className="md:col-span-3">
          <label htmlFor="time-select" className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            일일 가능 시간
          </label>
          <select
            id="time-select"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all shadow-xs cursor-pointer"
          >
            <option value="1시간">1시간 (가볍게 습관 만들기)</option>
            <option value="1.5시간">1.5시간 (적정 페이스)</option>
            <option value="2시간">2시간 (기본 추천)</option>
            <option value="3시간">3시간 (단기 집중 완성)</option>
            <option value="4시간">4시간+ (전업 수험생 코스)</option>
          </select>
        </div>

        {/* Generate Button */}
        <div className="md:col-span-3">
          <button
            type="button"
            onClick={onGeneratePlan}
            disabled={isGenerating}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>계획 생성 중...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-indigo-200" />
                <span>주간 계획 생성</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Real-time Progress Bar Section */}
      <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              {percentage === 100 ? (
                <Trophy className="w-4 h-4 text-amber-500 animate-bounce" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
            </div>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              오늘의 실시간 학습 진행률
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-medium text-slate-600 dark:text-slate-300">
              {completedTasksCount} / {totalTasksCount} 완료
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-semibold">
            {percentage === 100 ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                🎉 오늘 목표 완벽 달성! 수고 많으셨습니다!
              </span>
            ) : (
              <span className="text-slate-500 dark:text-slate-400">
                남은 항목 <strong className="text-indigo-600 dark:text-indigo-400">{totalTasksCount - completedTasksCount}개</strong> (예상 소요시간 약 {(totalTasksCount - completedTasksCount) * 30}분)
              </span>
            )}
            <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Animated Progress Track */}
        <div className="relative w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out shadow-xs ${
              percentage === 100
                ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500'
                : 'bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-600'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </section>
  );
};
