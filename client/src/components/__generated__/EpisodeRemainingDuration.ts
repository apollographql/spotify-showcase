import * as Types from '../../types/globalTypes.codegen';

export type EpisodeRemainingDuration_Episode = {
  __typename: 'Episode';
  id: string;
  durationMs: number;
  resumePoint: {
    __typename: 'ResumePoint';
    fullyPlayed: boolean;
    resumePositionMs: number;
  };
};
