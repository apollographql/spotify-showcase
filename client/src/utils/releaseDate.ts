import { ReleaseDate } from '../types/api';

export const yearOfRelease = (releaseDate: ReleaseDate) => {
  return releaseDate.date.replace(/^(\d{4}).*$/, '$1');
};
