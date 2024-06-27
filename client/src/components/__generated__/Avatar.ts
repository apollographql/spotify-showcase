import * as Types from '../../types/globalTypes.codegen';

export type Avatar_Profile_CurrentUserProfile_ = {
  __typename: 'CurrentUserProfile';
  id: string;
  images: Array<{ __typename: 'Image'; url: string }> | null;
};

export type Avatar_Profile_User_ = {
  __typename: 'User';
  id: string;
  images: Array<{ __typename: 'Image'; url: string }> | null;
};

export type Avatar_Profile =
  | Avatar_Profile_CurrentUserProfile_
  | Avatar_Profile_User_;
