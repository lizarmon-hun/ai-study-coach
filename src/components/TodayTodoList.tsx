'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, Lightbulb, HelpCircle, Plus, Clock, Tag, Sparkles, CheckCheck } from 'lucide-react';
import { Task } from '../types';

interface TodayTodoListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onOpenConcept: (task: Task) => void;
  onOpenQuiz: (task: Task) => void;
  onAddTask: (title: string, category: string, minutes: number) => void;
  dayTitle: string;
  isToday: boolean;
}

export const TodayTodoList: React.FC<TodayTodoListProps> = ({
  tasks,
  onToggleTask,
  onOpenConcept,
  onOpenQuiz,
  onAddTask,
  dayTitle,
  isToday,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('핵심 개념');
  const [newTaskMinutes, setNewTaskMinutes] = useState(30);

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle.trim(), newTaskCategory, Number(newTaskMinutes) || 30);
    setNewTaskTitle('');
    setIsAdding(false);
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              isToday
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}>
              {isToday ? '오늘의 할 일' : '선택된 일자 할 일'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {dayTitle}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
            체크리스트 & 학습 도구
          </h2>
        </div>

        {/* Filter Chips & Add Action */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <div className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl flex items-center text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              전체 ({tasks.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                filter === 'pending'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              미완료 ({tasks.length - completedCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                filter === 'completed'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              완료 ({completedCount})
            </button>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            type="button"
            className="p-1.5 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-400 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1 text-xs font-medium px-2.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">항목 추가</span>
          </button>
        </div>
      </div>

      {/* Add Task Form (Collapsible) */}
      {isAdding && (
        <form onSubmit={handleAddNewTask} className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 animate-in fade-in duration-200">
          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            새로운 학습 항목 추가
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <input
              type="text"
              placeholder="학습할 항목 제목을 입력하세요"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="sm:col-span-6 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
              autoFocus
            />
            <input
              type="text"
              placeholder="카테고리 (예: 알고리즘)"
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              className="sm:col-span-3 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
            />
            <select
              value={newTaskMinutes}
              onChange={(e) => setNewTaskMinutes(Number(e.target.value))}
              className="sm:col-span-3 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value={15}>15분</option>
              <option value={30}>30분</option>
              <option value={45}>45분</option>
              <option value={60}>60분</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            >
              추가하기
            </button>
          </div>
        </form>
      )}

      {/* Task Items List */}
      <div className="mt-4 space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="py-12 text-center text-slate-400 dark:text-slate-500">
            <CheckCheck className="w-10 h-10 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-medium">표시할 학습 태스크가 없습니다.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.completed;

            return (
              <div
                key={task.id}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isDone
                    ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/80 opacity-80'
                    : 'bg-white dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/70 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-xs'
                }`}
              >
                {/* Left: Checkbox & Title & Badges */}
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => onToggleTask(task.id)}
                    className="mt-0.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0 cursor-pointer"
                    aria-label={isDone ? '완료 취소' : '학습 완료 처리'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        <Tag className="w-3 h-3" />
                        {task.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        <Clock className="w-3 h-3" />
                        약 {task.estimatedMinutes}분
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        task.difficulty === '초급'
                          ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300'
                          : task.difficulty === '중급'
                          ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300'
                          : 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300'
                      }`}>
                        {task.difficulty}
                      </span>
                    </div>

                    <h3
                      onClick={() => onToggleTask(task.id)}
                      className={`text-sm sm:text-base font-bold transition-all cursor-pointer select-none leading-snug ${
                        isDone
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {task.title}
                    </h3>
                  </div>
                </div>

                {/* Right Action Buttons: '초보용 개념 설명' & '퀴즈 5문제' */}
                <div className="flex items-center space-x-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 w-full sm:w-auto justify-end">
                  {/* Concept Explainer Button */}
                  <button
                    type="button"
                    onClick={() => onOpenConcept(task)}
                    className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs active:scale-[0.97] cursor-pointer"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>초보용 개념 설명</span>
                  </button>

                  {/* Quiz 5 Questions Button */}
                  <button
                    type="button"
                    onClick={() => onOpenQuiz(task)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs active:scale-[0.97] cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>퀴즈 5문제</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

