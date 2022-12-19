import { defaultFieldResolver } from 'graphql';
import { wrap } from './helpers';

const defaultResolver = wrap(defaultFieldResolver);

export default defaultResolver;
