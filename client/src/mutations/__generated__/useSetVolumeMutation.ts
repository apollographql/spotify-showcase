import * as Types from '../../types/globalTypes.codegen';

export type SetVolumeMutationVariables = Types.Exact<{
  volumePercent: Types.Scalars['Int']['input'];
}>;

export type SetVolumeMutation = {
  __typename: 'Mutation';
  setVolume: {
    __typename: 'SetVolumeResponse';
    playbackState: {
      __typename: 'PlaybackState';
      device: {
        __typename: 'Device';
        id: string | null;
        volumePercent: number;
      };
    } | null;
  } | null;
};

export type SetVolumeCacheFragment = {
  __typename: 'PlaybackState';
  device: { __typename: 'Device'; id: string | null; volumePercent: number };
};
