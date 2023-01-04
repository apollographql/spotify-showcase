import { ReleaseDate, ReleaseDatePrecision } from '../types/api';
import { parse } from 'date-fns';

export const yearOfRelease = (releaseDate: Pick<ReleaseDate, 'date'>) => {
  return releaseDate.date.replace(/^(\d{4}).*$/, '$1');
};

export const parseReleaseDate = (releaseDate: ReleaseDate) => {
  switch (releaseDate.precision) {
    case ReleaseDatePrecision.Day:
      return parse(releaseDate.date, 'yyyy-MM-dd', new Date());
    case ReleaseDatePrecision.Month:
      return parse(releaseDate.date, 'yyyy-MM', new Date());
    case ReleaseDatePrecision.Year:
      return parse(releaseDate.date, 'yyyy', new Date());
  }
};
