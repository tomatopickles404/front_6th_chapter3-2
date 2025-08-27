import { Repeat } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { render, screen } from '@testing-library/react';

// 테스트 대상 컴포넌트
interface EventDisplayProps {
  event: {
    id: string;
    title: string;
    repeat: {
      type: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    };
  };
}

function EventDisplay({ event }: EventDisplayProps) {
  const isRepeating = event.repeat.type !== 'none';

  return (
    <Box sx={{ p: 1, border: '1px solid #ccc', borderRadius: 1 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        {isRepeating && <Repeat data-testid="repeat-icon" />}
        <Typography>{event.title}</Typography>
      </Stack>
    </Box>
  );
}

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
    render(<EventDisplay event={repeatingEvent} />);

    // Then: 반복 아이콘이 표시되어야 한다
    expect(screen.getByTestId('repeat-icon')).toBeInTheDocument();
  });

  it('반복이 아닌 일정에는 반복 아이콘이 표시되지 않는다', () => {
    // Given: 반복이 아닌 일정이 있는 경우
    const nonRepeatingEvent = createTestEvent('일회성 미팅', 'none');

    // When: 반복이 아닌 일정을 렌더링할 때
    render(<EventDisplay event={nonRepeatingEvent} />);

    // Then: 반복 아이콘이 표시되지 않아야 한다
    expect(screen.queryByTestId('repeat-icon')).not.toBeInTheDocument();
  });
});
