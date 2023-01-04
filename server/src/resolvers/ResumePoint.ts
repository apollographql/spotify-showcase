import { ResumePointResolvers } from './types';
import { prop } from './helpers';

const resolvers: ResumePointResolvers = {
  fullyPlayed: prop('fully_played'),
  resumePositionMs: prop('resume_position_ms'),
};

export default resolvers;
