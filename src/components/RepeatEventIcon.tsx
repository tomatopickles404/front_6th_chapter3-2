import { Repeat } from '@mui/icons-material';
import { Box, Tooltip } from '@mui/material';

interface RepeatEventIconProps {
  repeatType: 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval?: number;
  endDate?: string;
}

export function RepeatEventIcon({ repeatType, interval = 1, endDate }: RepeatEventIconProps) {
  if (repeatType === 'none') {
    return null;
  }

  const getRepeatText = () => {
    const typeText = {
      daily: '일',
      weekly: '주',
      monthly: '월',
      yearly: '년',
    }[repeatType];

    return `${interval}${typeText}마다${endDate ? ` (종료: ${endDate})` : ''}`;
  };

  return (
    <Tooltip title={getRepeatText()} arrow>
      <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
        <Repeat
          fontSize="small"
          color="primary"
          data-testid="repeat-icon"
          aria-label={`반복 일정: ${getRepeatText()}`}
        />
      </Box>
    </Tooltip>
  );
}
