import {
  ReleaseDate as ReleaseDateType,
  ReleaseDatePrecision,
} from '../types/api.schema';
import { format, parse } from 'date-fns';

interface ReleaseDateProps {
  releaseDate: ReleaseDateType;
}

const ReleaseDate = ({ releaseDate }: ReleaseDateProps) => {
  return <>{formatDate(releaseDate)}</>;
};

const formatDate = (releaseDate: ReleaseDateType) => {
  switch (releaseDate.precision) {
    case ReleaseDatePrecision.YEAR:
      return releaseDate.date;
    case ReleaseDatePrecision.MONTH:
      return format(
        parse(releaseDate.date, 'yyyy-MM', new Date()),
        FORMATS[releaseDate.precision]
      );
    case ReleaseDatePrecision.DAY:
      return format(
        parse(releaseDate.date, 'yyyy-MM-dd', new Date()),
        FORMATS[releaseDate.precision]
      );
  }
};

const FORMATS: Record<ReleaseDatePrecision, string> = {
  [ReleaseDatePrecision.DAY]: 'MMM d, yyyy',
  [ReleaseDatePrecision.MONTH]: 'MMM yyyy',
  [ReleaseDatePrecision.YEAR]: 'yyyy',
};

export default ReleaseDate;
