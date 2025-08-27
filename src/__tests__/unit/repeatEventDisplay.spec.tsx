import { render, screen } from '@testing-library/react';

import { RepeatEventIcon } from '../../components/RepeatEventIcon';

// 테스트용 일정 데이터 생성 함수
const createTestEvent = (
  title: string,
  repeatType: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly'
) => ({
  id: `event-${title}`,
  title,
  repeat: { type: repeatType },
});

describe('반복 일정 표시 테스트', () => {
  it('반복 일정에는 반복 아이콘이 표시된다', () => {
    // Given: 반복 일정이 있는 경우
    const repeatingEvent = createTestEvent('정기 회의', 'weekly');

    // When: 반복 일정을 렌더링할 때
    render(<RepeatEventIcon repeatType={repeatingEvent.repeat.type} />);

    // Then: 반복 아이콘이 표시되어야 한다
    expect(screen.getByTestId('repeat-icon')).toBeInTheDocument();
  });

  it('반복이 아닌 일정에는 반복 아이콘이 표시되지 않는다', () => {
    // Given: 반복이 아닌 일정이 있는 경우
    const nonRepeatingEvent = createTestEvent('일회성 미팅', 'none');

    // When: 반복이 아닌 일정을 렌더링할 때
    render(<RepeatEventIcon repeatType={nonRepeatingEvent.repeat.type} />);

    // Then: 반복 아이콘이 표시되지 않아야 한다
    expect(screen.queryByTestId('repeat-icon')).not.toBeInTheDocument();
  });
});
