import { ReleaseDate, ReleaseDatePrecision } from '../types/api.schema';
import { parse } from 'date-fns';

export const yearOfRelease = (releaseDate: Pick<ReleaseDate, 'date'>) => {
  return releaseDate.date.replace(/^(\d{4}).*$/, '$1');
};

export const parseReleaseDate = (releaseDate: ReleaseDate) => {
  switch (releaseDate.precision) {
  case ReleaseDatePrecision.DAY:
      return parse(releaseDate.date, 'yyyy-MM-dd', new Date());
  case ReleaseDatePrecision.MONTH:
      return parse(releaseDate.date, 'yyyy-MM', new Date());
  case ReleaseDatePrecision.YEAR:
      return parse(releaseDate.date, 'yyyy', new Date());
  }
};
