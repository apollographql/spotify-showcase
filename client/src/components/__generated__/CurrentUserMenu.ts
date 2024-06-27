import * as Types from '../../types/globalTypes.codegen';

export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename: 'Query';
  me: {
    __typename: 'CurrentUser';
    profile: {
      __typename: 'CurrentUserProfile';
      id: string;
      displayName: string | null;
      images: Array<{ __typename: 'Image'; url: string }> | null;
    };
  } | null;
};
