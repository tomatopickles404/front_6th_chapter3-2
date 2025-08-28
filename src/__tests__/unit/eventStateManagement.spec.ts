import { RepeatType } from '../../types';
import { convertToSingleEvent, convertToRepeatingEvent } from '../../utils/eventStateUtils';

const createTestEvent = (
  title: string,
  repeatType: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'
) => ({
  id: `event-${title}`,
  title,
  repeat: { type: repeatType },
});

describe('convertToSingleEvent', () => {
  it('반복 일정을 단일 일정으로 변환한다', () => {
    const repeatingEvent = createTestEvent('정기 회의', 'weekly');
    const result = convertToSingleEvent(repeatingEvent);

    expect(result.repeat.type).toBe('none');
    expect(result.repeat.interval).toBe(1);
    expect(result.repeat.endDate).toBeUndefined();
    expect(result.title).toBe('정기 회의'); // 다른 필드 보존 확인
  });

  it('이미 단일 일정인 경우에도 안전하게 처리한다', () => {
    const singleEvent = createTestEvent('일회성 미팅', 'none');
    const result = convertToSingleEvent(singleEvent);

    expect(result.repeat.type).toBe('none');
    expect(result.repeat.interval).toBe(1);
  });

  it('모든 반복 유형을 단일 일정으로 변환한다', () => {
    const types: RepeatType[] = ['daily', 'weekly', 'monthly', 'yearly'];

    types.forEach((type) => {
      const event = createTestEvent(`테스트 ${type}`, type);
      const result = convertToSingleEvent(event);
      expect(result.repeat.type).toBe('none');
    });
  });
});

describe('convertToRepeatingEvent', () => {
  it('단일 일정을 반복 일정으로 변환한다', () => {
    const singleEvent = createTestEvent('일회성 미팅', 'none');
    const result = convertToRepeatingEvent(singleEvent, 'weekly', 2);

    expect(result.repeat.type).toBe('weekly');
    expect(result.repeat.interval).toBe(2);
    expect(result.repeat.endDate).toBeUndefined();
  });

  it('다양한 반복 유형으로 변환한다', () => {
    const singleEvent = createTestEvent('테스트', 'none');
    const types: RepeatType[] = ['daily', 'weekly', 'monthly', 'yearly'];

    types.forEach((type) => {
      const result = convertToRepeatingEvent(singleEvent, type, 1);
      expect(result.repeat.type).toBe(type);
      expect(result.repeat.interval).toBe(1);
    });
  });

  it('다양한 간격으로 변환한다', () => {
    const singleEvent = createTestEvent('테스트', 'none');
    const intervals = [1, 2, 3, 7];

    intervals.forEach((interval) => {
      const result = convertToRepeatingEvent(singleEvent, 'weekly', interval);
      expect(result.repeat.interval).toBe(interval);
    });
  });
});
