import { RepeatInfo } from '../types';

interface RepeatEventInput {
  date: string;
  repeatType: RepeatInfo['type'];
  interval: number;
  endDate: string;
}

export const generateRepeatDates = (event: RepeatEventInput): string[] => {
  // TODO: 반복 일정 생성 로직 구현
  throw new Error('Not implemented yet');
};
