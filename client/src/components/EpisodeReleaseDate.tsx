import { ReleaseDate, ReleaseDatePrecision } from '../types/api';
import { format, parse, isBefore, startOfMonth } from 'date-fns';

interface EpisodeReleaseDateProps {
  releaseDate: ReleaseDate;
}

const EpisodeReleaseDate = ({ releaseDate }: EpisodeReleaseDateProps) => {
  return <>{formatDate(releaseDate)}</>;
};

const formatDate = (releaseDate: ReleaseDate) => {
  const now = new Date();

  switch (releaseDate.precision) {
    case ReleaseDatePrecision.Year:
      return releaseDate.date;
    case ReleaseDatePrecision.Month:
      return format(parse(releaseDate.date, 'yyyy-MM', new Date()), 'MMM yyyy');
    case ReleaseDatePrecision.Day: {
      const date = parse(releaseDate.date, 'yyyy-MM-dd', new Date());

      return isBefore(date, startOfMonth(now))
        ? format(date, 'MMM yyyy')
        : format(date, 'MMM d');
    }
  }
};

export default EpisodeReleaseDate;
