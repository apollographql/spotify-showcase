interface DurationProps {
  durationMs: number;
  format?: keyof typeof FORMAT;
}

interface TimeSegments {
  hours: number;
  minutes: number;
  seconds: number;
}

const FORMAT = {
  SHORT: 'SHORT',
  LONG: 'LONG',
} as const;

const Duration = ({ durationMs, format = FORMAT.SHORT }: DurationProps) => {
  const seconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const formatter = formatters[format];

  return <>{formatter({ seconds, minutes, hours })}</>;
};

Duration.FORMAT = FORMAT;

const formatters = {
  [FORMAT.LONG]: ({ seconds, minutes, hours }: TimeSegments) => {
    const segments = [];

    if (seconds % 60 > 0) {
      segments.unshift(`${seconds % 60} sec`);
    }

    if (minutes % 60 > 0) {
      segments.unshift(`${minutes % 60} min`);
    }

    if (hours > 0) {
      segments.unshift(`${hours} hr`);
    }

    return segments.join(' ');
  },
  [FORMAT.SHORT]: ({ seconds, minutes, hours }: TimeSegments) => {
    const segments = [
      String(minutes % 60).padStart(hours > 0 ? 2 : 1, '0'),
      String(seconds % 60).padStart(2, '0'),
    ];

    if (hours > 0) {
      segments.unshift(String(hours).padStart(2, '0'));
    }

    return segments.join(':');
  },
};

export default Duration;
