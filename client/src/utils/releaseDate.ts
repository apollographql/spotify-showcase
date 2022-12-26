import { Scalars } from '../types/api';

interface ReleaseDate {
  date: Scalars['String'];
}

export const yearOfRelease = (releaseDate: ReleaseDate) => {
  return releaseDate.date.replace(/^(\d{4}).*$/, '$1');
};
