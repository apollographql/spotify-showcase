interface DurationProps {
  durationMs: number;
}

const Duration = ({ durationMs }: DurationProps) => {
  const seconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const segments = [
    String(minutes % 60).padStart(hours > 0 ? 2 : 1, '0'),
    String(seconds % 60).padStart(2, '0'),
  ];

  if (hours > 0) {
    segments.unshift(String(hours).padStart(2, '0'));
  }

  return <>{segments.join(':')}</>;
};

export default Duration;
