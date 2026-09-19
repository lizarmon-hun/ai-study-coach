export const KOREAN_DAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export interface CalculatedDayInfo {
  dayNumber: number;
  dayOfWeek: string;
  dateStr: string;
  isToday: boolean;
}

/**
 * 오늘을 기준으로 향후 7일간의 날짜 및 요일 정보를 실시간 계산합니다.
 * Day 1이 오늘(isToday: true)이며, Day 2~7은 내일부터 순차 배정됩니다.
 */
export function getUpcoming7Days(baseDate: Date = new Date()): CalculatedDayInfo[] {
  return Array.from({ length: 7 }, (_, i) => {
    const target = new Date(baseDate);
    target.setDate(baseDate.getDate() + i);

    const month = target.getMonth() + 1;
    const date = target.getDate();
    const dayOfWeek = KOREAN_DAYS[target.getDay()];

    return {
      dayNumber: i + 1,
      dayOfWeek,
      dateStr: `${month}.${date} (${dayOfWeek})`,
      isToday: i === 0,
    };
  });
}

/**
 * 현재 날짜를 "YYYY년 M월 D일 (요일)" 한국어 형식으로 반환합니다.
 */
export function formatKoreanToday(baseDate: Date = new Date()): string {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth() + 1;
  const date = baseDate.getDate();
  const dayOfWeek = KOREAN_DAYS[baseDate.getDay()];
  return `${year}년 ${month}월 ${date}일 (${dayOfWeek}요일)`;
}

