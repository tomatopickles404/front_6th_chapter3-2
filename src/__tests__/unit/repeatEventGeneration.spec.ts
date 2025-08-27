import { generateRepeatDates } from '../../utils/repeatEvent';

describe('반복 일정 생성 테스트', () => {
  describe('매월 반복', () => {
    it('31일에 매월 반복을 선택하면 2월을 제외한 매월 31일에 일정을 생성한다', () => {
      // Given: 31일에 매월 반복 일정을 생성하는 경우
      const event = {
        date: '2025-01-31',
        repeatType: 'monthly' as const,
        interval: 1,
        endDate: '2025-10-30',
      };

      // When: 반복 일정을 생성할 때
      const repeatDates = generateRepeatDates(event);

      // Then: 2월을 제외한 매월 31일에만 일정이 생성되어야 한다
      expect(repeatDates).toEqual([
        '2025-01-31',
        '2025-03-31', // 2월은 28일이므로 제외
        '2025-05-31',
        '2025-07-31',
        '2025-08-31',
        '2025-10-31',
      ]);
    });

    it('30일에 매월 반복을 선택하면 2월은 28일(또는 29일)에 일정을 생성한다', () => {
      // Given: 30일에 매월 반복 일정을 생성하는 경우
      const event = {
        date: '2025-01-30',
        repeatType: 'monthly' as const,
        interval: 1,
        endDate: '2025-06-30',
      };

      // When: 반복 일정을 생성할 때
      const repeatDates = generateRepeatDates(event);

      // Then: 2월은 28일까지만, 나머지는 30일에 일정이 생성되어야 한다
      expect(repeatDates).toEqual([
        '2025-01-30',
        '2025-02-28', // 2월은 28일까지만
        '2025-03-30',
        '2025-04-30',
        '2025-05-30',
        '2025-06-30',
      ]);
    });
  });

  describe('매년 반복', () => {
    it('윤년 2월 29일에 매년 반복을 선택하면 매년 2월 29일에만 일정을 생성한다', () => {
      // Given: 윤년 2월 29일에 매년 반복 일정을 생성하는 경우
      const event = {
        date: '2024-02-29', // 윤년
        repeatType: 'yearly' as const,
        interval: 1,
        endDate: '2028-02-29',
      };

      // When: 반복 일정을 생성할 때
      const repeatDates = generateRepeatDates(event);

      // Then: 윤년의 2월 29일에만 일정이 생성되어야 한다
      expect(repeatDates).toEqual([
        '2024-02-29', // 2024년 (윤년)
        '2028-02-29', // 2028년 (윤년)
        // 2025, 2026, 2027은 윤년이 아니므로 제외
      ]);
    });
  });

  describe('기본 반복 유형', () => {
    it('매일 반복을 선택하면 시작일부터 종료일까지 매일 일정을 생성한다', () => {
      const event = {
        date: '2025-01-01',
        repeatType: 'daily' as const,
        interval: 1,
        endDate: '2025-01-05',
      };

      const repeatDates = generateRepeatDates(event);

      expect(repeatDates).toEqual([
        '2025-01-01',
        '2025-01-02',
        '2025-01-03',
        '2025-01-04',
        '2025-01-05',
      ]);
    });

    it('매주 반복을 선택하면 7일 간격으로 일정을 생성한다', () => {
      const event = {
        date: '2025-01-01', // 수요일
        repeatType: 'weekly' as const,
        interval: 1,
        endDate: '2025-01-29',
      };

      const repeatDates = generateRepeatDates(event);

      expect(repeatDates).toEqual([
        '2025-01-01',
        '2025-01-08',
        '2025-01-15',
        '2025-01-22',
        '2025-01-29',
      ]);
    });
  });
});

describe('반복 일정 생성 - 경계값 테스트', () => {
  it('반복 종료일이 시작일보다 이전이면 빈 배열을 반환한다', () => {
    // Given: 시작일이 2025-01-31이고, 종료일이 2024-12-31인 경우
    const startDate = '2025-01-31';
    const endDate = '2024-12-31';
    const event = {
      date: startDate,
      repeatType: 'monthly' as const,
      interval: 1,
      endDate: endDate,
    };

    // When: 반복 일정을 생성할 때
    const repeatDates = generateRepeatDates(event);

    // Then: 빈 배열이 반환되어야 한다
    expect(repeatDates).toEqual([]);
  });
});

describe('반복 간격', () => {
  it('2주마다 반복을 선택하면 14일 간격으로 일정을 생성한다', () => {
    // Given: 2주마다 반복하는 일정을 생성하는 경우
    const event = {
      date: '2025-01-01',
      repeatType: 'weekly' as const,
      interval: 2, // 2주마다
      endDate: '2025-02-26',
    };

    // When: 반복 일정을 생성할 때
    const repeatDates = generateRepeatDates(event);

    // Then: 14일 간격으로 일정이 생성되어야 한다
    expect(repeatDates).toEqual([
      '2025-01-01',
      '2025-01-15', // 14일 후
      '2025-01-29', // 28일 후
      '2025-02-12', // 42일 후
      '2025-02-26', // 56일 후
    ]);
  });

  it('2개월마다 반복을 선택하면 2개월 간격으로 일정을 생성한다', () => {
    const event = {
      date: '2025-01-31',
      repeatType: 'monthly' as const,
      interval: 2, // 2개월마다
      endDate: '2025-11-30',
    };

    const repeatDates = generateRepeatDates(event);

    expect(repeatDates).toEqual([
      '2025-01-31',
      '2025-03-31',
      '2025-05-31',
      '2025-07-31',
      '2025-09-30', // 9월은 30일까지만
      '2025-11-30',
    ]);
  });
});

describe('날짜 형식 및 유효성', () => {
  it('잘못된 날짜 형식에 대해 에러를 발생시킨다', () => {
    const event = {
      date: 'invalid-date',
      repeatType: 'daily' as const,
      interval: 1,
      endDate: '2025-01-05',
    };

    expect(() => generateRepeatDates(event)).toThrow('Invalid date format');
  });
});

// 추가 필요한 테스트
describe('윤년 처리', () => {
  it('윤년 2월 29일에 매년 반복을 선택하면 매년 2월 29일에만 일정을 생성한다', () => {
    // Given: 윤년 2월 29일에 매년 반복 일정을 생성하는 경우
    const event = {
      date: '2024-02-29', // 윤년
      repeatType: 'yearly' as const,
      interval: 1,
      endDate: '2028-02-29',
    };

    // When: 반복 일정을 생성할 때
    const repeatDates = generateRepeatDates(event);

    // Then: 윤년의 2월 29일에만 일정이 생성되어야 한다
    expect(repeatDates).toEqual([
      '2024-02-29', // 2024년 (윤년)
      '2028-02-29', // 2028년 (윤년)
    ]);
  });
});
