'use client';

import React from 'react';
import { Sparkles, Flame, Clock, CheckCircle2, Target } from 'lucide-react';

interface HeaderProps {
  currentGoal: string;
  dailyHours: string;
  completedTasksCount: number;
  totalTasksCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentGoal,
  dailyHours,
  completedTasksCount,
  totalTasksCount,
}) => {
  const isAllCompleted = totalTasksCount > 0 && completedTasksCount === totalTasksCount;

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & App Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  AI Study Coach
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
                  MVP
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                초개인화 AI 학습 & 습관 메이커
              </p>
            </div>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Current Target Pill */}
            <div className="hidden lg:flex items-center space-x-1 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
              <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="truncate max-w-[140px]">{currentGoal}</span>
            </div>
            {/* Streak Badge */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-medium shadow-xs">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce" />
              <span>
                <strong className="font-bold">5일</strong> 연속 학습
              </span>
            </div>

            {/* Daily Hours Indicator (Desktop) */}
            <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>목표: {dailyHours}/일</span>
            </div>

            {/* Status Chip */}
            <div className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
              isAllCompleted 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' 
                : 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{completedTasksCount}/{totalTasksCount} 완료</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
