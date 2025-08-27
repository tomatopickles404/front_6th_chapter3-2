import { convertToSingleEvent, convertToRepeatingEvent } from '../../utils/eventStateManagement';

const createTestEvent = (
  title: string,
  repeatType: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'
) => ({
  id: `event-${title}`,
  title,
  repeat: { type: repeatType },
});

describe('이벤트 상태 관리 함수 테스트', () => {
  it('반복 일정을 단일 일정으로 변환한다', () => {
    const repeatingEvent = createTestEvent('정기 회의', 'weekly');
    const result = convertToSingleEvent(repeatingEvent);
    expect(result.repeat.type).toBe('none');
  });

  it('단일 일정을 반복 일정으로 변환한다', () => {
    const singleEvent = createTestEvent('일회성 미팅', 'none');
    const result = convertToRepeatingEvent(singleEvent, 'weekly', 1);
    expect(result.repeat.type).toBe('weekly');
  });
});
