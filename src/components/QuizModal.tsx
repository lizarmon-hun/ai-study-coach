'use client';

import React, { useState, useEffect } from 'react';
import { X, HelpCircle, Check, AlertCircle, ArrowRight, RotateCcw, Trophy, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizItem } from '../types';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicTitle: string;
  quizzes: QuizItem[];
  onFinishQuiz?: (score: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  topicTitle,
  quizzes,
  onFinishQuiz,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

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

  if (!isOpen || !quizzes || quizzes.length === 0) return null;

  const currentQuiz = quizzes[currentIndex];
  const totalQuestions = quizzes.length;

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionIndex);
    setIsAnswerSubmitted(true);
    setUserAnswers((prev) => [...prev, optionIndex]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finished all questions
      setIsFinished(true);
      const correctCount = userAnswers.filter((ans, idx) => ans === quizzes[idx]?.answerIndex).length +
        (selectedOption === currentQuiz.answerIndex ? 1 : 0);
      if (correctCount >= 3) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore if confetti fails
        }
      }
      if (onFinishQuiz) {
        onFinishQuiz(correctCount);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setIsFinished(false);
  };

  // Calculate final score
  const correctAnswersCount = userAnswers.reduce((acc, ans, idx) => {
    return ans === quizzes[idx]?.answerIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-indigo-500/10 via-sky-500/5 to-transparent flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  AI 실전 점검 퀴즈
                </span>
                {!isFinished && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold">
                    {currentIndex + 1} / {totalQuestions}
                  </span>
                )}
              </div>
              <h2 id="quiz-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
                {topicTitle}
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

        {/* Quiz Progress Bar */}
        {!isFinished && (
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5">
            <div
              className="bg-indigo-600 h-1.5 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-sm">
          {!isFinished ? (
            <>
              {/* Question */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Q{currentQuiz.id}.</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {currentQuiz.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuiz.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQuiz.answerIndex;
                  const showResult = isAnswerSubmitted;

                  let optionStyles = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-600 text-slate-800 dark:text-slate-200';

                  if (showResult) {
                    if (isCorrect) {
                      optionStyles = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      optionStyles = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-semibold ring-1 ring-rose-500';
                    } else {
                      optionStyles = 'border-slate-200 dark:border-slate-800 opacity-50 bg-white dark:bg-slate-800 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyles}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                          showResult && isCorrect
                            ? 'bg-emerald-500 text-white'
                            : showResult && isSelected && !isCorrect
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm">{option}</span>
                      </div>

                      {showResult && (
                        <div className="shrink-0">
                          {isCorrect && (
                            <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          )}
                          {isSelected && !isCorrect && (
                            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Explanation Box */}
              {isAnswerSubmitted && (
                <div className={`p-4 rounded-xl border animate-in fade-in duration-200 ${
                  selectedOption === currentQuiz.answerIndex
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                    : 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
                }`}>
                  <div className="flex items-center space-x-2 font-bold mb-1 text-sm">
                    {selectedOption === currentQuiz.answerIndex ? (
                      <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        정답입니다! 완벽해요 👏
                      </span>
                    ) : (
                      <span className="text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        아쉽네요! 정답은 {String.fromCharCode(65 + currentQuiz.answerIndex)}번입니다.
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-1">
                    <strong className="font-semibold">해설: </strong>{currentQuiz.explanation}
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div className="py-6 text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-500 to-sky-400 text-white flex items-center justify-center shadow-xl shadow-indigo-500/25">
                {correctAnswersCount >= 4 ? (
                  <Trophy className="w-10 h-10 animate-bounce" />
                ) : (
                  <Award className="w-10 h-10" />
                )}
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  퀴즈 테스트 완료
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {totalQuestions}문제 중 <span className="text-indigo-600 dark:text-indigo-400">{correctAnswersCount}문제</span> 정답!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
                  {correctAnswersCount === totalQuestions
                    ? '🎉 대단합니다! 만점으로 해당 개념을 완벽하게 마스터하셨습니다.'
                    : correctAnswersCount >= 3
                    ? '👏 합격선(60점)을 넘겼습니다! 틀린 문제의 해설을 가볍게 복습해 보세요.'
                    : '💪 괜찮습니다! 개념 노트를 다시 훑어보고 한 번 더 도전해 보세요.'}
                </p>
              </div>

              {/* Score Breakdown Pills */}
              <div className="flex justify-center gap-2 max-w-sm mx-auto">
                {quizzes.map((q, idx) => {
                  const isUserCorrect = userAnswers[idx] === q.answerIndex;
                  return (
                    <div
                      key={idx}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold border ${
                        isUserCorrect
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                          : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                      }`}
                    >
                      Q{idx + 1} {isUserCorrect ? 'O' : 'X'}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
          {!isFinished ? (
            <>
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
              >
                그만 풀기
              </button>

              <button
                onClick={handleNext}
                disabled={!isAnswerSubmitted}
                type="button"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-indigo-500/20 flex items-center gap-1.5 cursor-pointer"
              >
                <span>{currentIndex + 1 === totalQuestions ? '결과 보기' : '다음 문제'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="w-full flex items-center justify-between gap-3">
              <button
                onClick={handleRestart}
                type="button"
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>다시 풀기</span>
              </button>

              <button
                onClick={onClose}
                type="button"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-md shadow-indigo-500/20 cursor-pointer"
              >
                학습 완료하고 닫기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
