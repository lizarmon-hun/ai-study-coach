'use client';

import React, { useEffect } from 'react';
import { X, Lightbulb, Sparkles, CheckCircle2, MessageSquare, ArrowRight, HelpCircle } from 'lucide-react';
import { ConceptDetail } from '../types';

interface ConceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  concept: ConceptDetail | null;
  onOpenQuiz?: () => void;
}

export const ConceptModal: React.FC<ConceptModalProps> = ({
  isOpen,
  onClose,
  concept,
  onOpenQuiz,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !concept) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="concept-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                초보용 친절 개념 노트
              </span>
              <h2 id="concept-modal-title" className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                {concept.topic}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
          {/* Real-world Analogy (비유) */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200/60 dark:border-amber-900/50">
            <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300 font-bold mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>1분 만에 이해하는 실생활 비유</span>
            </div>
            <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
              {concept.analogy}
            </p>
          </div>

          {/* 3-line Core Summary */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2.5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              3줄 핵심 요약
            </h3>
            <div className="space-y-2">
              {concept.summary.map((line, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800"
                >
                  <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/70 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 leading-snug">
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Exam / Practice Points */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              시험 & 실무 핵심 체크포인트
            </h3>
            <ul className="space-y-1.5 pl-2">
              {concept.keyPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start text-slate-600 dark:text-slate-300">
                  <span className="text-rose-500 font-bold mr-2">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Coach Tip Bubble */}
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/70 dark:border-indigo-800 flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-indigo-900 dark:text-indigo-200 text-xs mb-1">
                AI 코치의 족집게 팁
              </h4>
              <p className="text-indigo-800 dark:text-indigo-300 text-xs sm:text-sm leading-relaxed">
                {concept.coachTip}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
          >
            닫기
          </button>

          {onOpenQuiz && (
            <button
              onClick={() => {
                onClose();
                onOpenQuiz();
              }}
              type="button"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-indigo-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
              <span>바로 퀴즈 5문제 풀기</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

