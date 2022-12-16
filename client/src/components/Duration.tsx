interface DurationProps {
  durationMs: number;
}

const Duration = ({ durationMs }: DurationProps) => {
  const seconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const segments = [minutes % 60, seconds % 60];

  if (hours > 0) {
    segments.unshift(hours);
  }

  return (
    <>{segments.map((num) => num.toString().padStart(2, '0')).join(':')}</>
  );
};

export default Duration;
