'use client';

import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { DayPlan } from '../types';

interface WeeklyScheduleProps {
  days: DayPlan[];
  selectedDayIndex: number;
  onSelectDay: (index: number) => void;
}

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({
  days,
  selectedDayIndex,
  onSelectDay,
}) => {
  return (
    <section className="mb-6 sm:mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3.5 sm:mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400">
            <Calendar className="w-4 h-4" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            이번 주 학습 로드맵
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
            7일 완성 플랜
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
          카드를 클릭하여 요일별 계획을 확인할 수 있습니다
        </p>
      </div>

      {/* Cards Grid / Carousel */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 sm:gap-3">
        {days.map((day, index) => {
          const isSelected = selectedDayIndex === index;
          const isToday = day.isToday;
          const completedCount = day.tasks.filter((t) => t.completed).length;
          const totalCount = day.tasks.length;
          const isFinished = totalCount > 0 && completedCount === totalCount;

          return (
            <button
              key={day.dayNumber}
              type="button"
              onClick={() => onSelectDay(index)}
              className={`text-left p-3.5 sm:p-4 rounded-xl transition-all duration-200 relative flex flex-col justify-between border cursor-pointer ${
                isSelected
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm scale-[1.02]'
                  : isToday
                  ? 'bg-white dark:bg-slate-900 border-indigo-300 dark:border-indigo-700 shadow-xs hover:border-indigo-400'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Card Top: Day & Date */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        isToday
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {day.dayOfWeek}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Day {day.dayNumber}
                    </span>
                  </div>

                  {isToday && (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                    </span>
                  )}
                </div>

                {/* Date info */}
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">
                  {day.dateStr}
                </p>

                {/* Topic Title */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 line-clamp-2 min-h-[2.5rem] leading-snug">
                  {day.title}
                </h3>
              </div>

              {/* Card Bottom Status */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  태스크 {totalCount}개
                </span>

                {isFinished ? (
                  <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-0.5" />
                    완료
                  </span>
                ) : isToday ? (
                  <span className="inline-flex items-center text-indigo-600 dark:text-indigo-400 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mr-1 animate-pulse" />
                    진행 중
                  </span>
                ) : (
                  <span className="text-slate-400 text-[11px]">
                    {completedCount}/{totalCount}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
