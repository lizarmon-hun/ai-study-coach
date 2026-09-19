'use client';

import React, { useEffect } from 'react';
import { X, BookOpen, Clock, Calendar, Trash2, CheckCircle2, ArrowRight, Database, FolderArchive } from 'lucide-react';
import { SavedPlan, isSupabaseConfigured } from '../lib/supabase';

interface PlanHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  plans: SavedPlan[];
  activePlanId: string | null;
  onSelectPlan: (plan: SavedPlan) => void;
  onDeletePlan: (id: string) => void;
}

export const PlanHistoryModal: React.FC<PlanHistoryModalProps> = ({
  isOpen,
  onClose,
  plans,
  activePlanId,
  onSelectPlan,
  onDeletePlan,
}) => {
  const isCloudEnabled = isSupabaseConfigured();

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-indigo-500/10 via-sky-500/5 to-transparent">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  학습 기록 보관함
                </span>
                <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                  isCloudEnabled
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                }`}>
                  <Database className="w-3 h-3" />
                  {isCloudEnabled ? 'Supabase 클라우드 동기화' : '로컬 저장소 보관 중'}
                </span>
              </div>
              <h2 id="history-modal-title" className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                저장된 학습 플랜 목록
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-3 text-sm">
          {plans.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500">
              <BookOpen className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                아직 저장된 학습 플랜이 없습니다.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                상단에서 목표를 입력하고 [주간 계획 생성]을 누르면 자동으로 보관함에 저장됩니다!
              </p>
            </div>
          ) : (
            plans.map((plan) => {
              const isActive = plan.id === activePlanId;
              const allTasks = plan.days.flatMap((d) => d.tasks);
              const completedTasks = allTasks.filter((t) => t.completed).length;
              const percent = allTasks.length > 0 ? Math.round((completedTasks / allTasks.length) * 100) : 0;
              const formattedDate = new Date(plan.updated_at || plan.created_at).toLocaleDateString('ko-KR', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={plan.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isActive
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-600 ring-1 ring-indigo-500'
                      : 'bg-white dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      {isActive && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
                          현재 학습 중
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        <Clock className="w-3 h-3" />
                        {plan.hours}/일
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                        <Calendar className="w-3 h-3" />
                        {formattedDate}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white truncate">
                      {plan.goal}
                    </h3>

                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <span>7일 코스 (총 {allTasks.length}개 태스크)</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        진행률 {percent}% ({completedTasks}/{allTasks.length})
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => onDeletePlan(plan.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="플랜 삭제"
                      aria-label="플랜 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectPlan(plan);
                        onClose();
                      }}
                      className={`px-3.5 py-2 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
                        isActive
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 cursor-default'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20 active:scale-[0.98]'
                      }`}
                    >
                      <span>{isActive ? '학습 중' : '불러오기'}</span>
                      {!isActive && <ArrowRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between text-xs text-slate-500">
          <span>총 {plans.length}개의 플랜 저장됨</span>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
