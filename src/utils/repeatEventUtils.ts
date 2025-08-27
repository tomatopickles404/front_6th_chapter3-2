import { RepeatInfo } from '../types';

interface RepeatEventInput {
  date: string;
  repeatType: RepeatInfo['type'];
  interval: number;
  endDate: string;
}

export const generateRepeatDates = (event: RepeatEventInput): string[] => {
  const { repeatType } = event;
  // 1. 입력 유효성 검사
  // 2. 시작일과 종료일 비교
  // 3. 반복 유형별 날짜 생성
  if (repeatType === 'daily') {
    return generateDailyRepeatDates(event);
  }

  if (repeatType === 'weekly') {
    return generateWeeklyRepeatDates(event);
  }

  // 4. 결과 반환
};

const generateRepeatDatesForType = (event: RepeatEventInput, incrementDays: number): string[] => {
  const { date, endDate } = event;
  const repeatDates: string[] = [];
  const start = new Date(date);
  const end = new Date(endDate);

  while (start <= end) {
    repeatDates.push(start.toISOString().split('T')[0]);
    start.setDate(start.getDate() + incrementDays);
  }

  return repeatDates;
};

const generateDailyRepeatDates = (event: RepeatEventInput): string[] => {
  return generateRepeatDatesForType(event, event.interval);
};

const generateWeeklyRepeatDates = (event: RepeatEventInput): string[] => {
  return generateRepeatDatesForType(event, event.interval * 7);
};
};
