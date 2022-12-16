import {
  ReleaseDate as ReleaseDateType,
  ReleaseDatePrecision,
} from '../types/api';
import { format, parse } from 'date-fns';

interface ReleaseDateProps {
  releaseDate: ReleaseDateType;
}

const ReleaseDate = ({ releaseDate }: ReleaseDateProps) => {
  return <>{formatDate(releaseDate)}</>;
};

const formatDate = (releaseDate: ReleaseDateType) => {
  switch (releaseDate.precision) {
    case ReleaseDatePrecision.Year:
      return releaseDate.date;
    case ReleaseDatePrecision.Month:
      return format(
        parse(releaseDate.date, 'yyyy-MM', new Date()),
        FORMATS[releaseDate.precision]
      );
    case ReleaseDatePrecision.Day:
      return format(
        parse(releaseDate.date, 'yyyy-MM-dd', new Date()),
        FORMATS[releaseDate.precision]
      );
  }
};

const FORMATS: Record<ReleaseDatePrecision, string> = {
  [ReleaseDatePrecision.Day]: 'MMM d, yyyy',
  [ReleaseDatePrecision.Month]: 'MMM yyyy',
  [ReleaseDatePrecision.Year]: 'yyyy',
};

export default ReleaseDate;
