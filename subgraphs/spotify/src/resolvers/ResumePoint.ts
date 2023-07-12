import { ResumePointResolvers } from '../__generated__/resolvers-types';
import { prop } from './helpers';

export const ResumePoint: ResumePointResolvers = {
  fullyPlayed: prop('fully_played'),
  resumePositionMs: prop('resume_position_ms'),
};
