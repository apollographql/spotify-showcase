import { GraphQLResolveInfo } from 'graphql';
import { selectsField } from './graphql';

export const shouldLoadFullArtist = (
  pathToArtist: string[],
  info: GraphQLResolveInfo
) => {
  return ['followers', 'genres', 'images', 'popularity'].some((fieldName) =>
    selectsField([...pathToArtist, fieldName], info)
  );
};
