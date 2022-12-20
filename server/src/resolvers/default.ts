import { defaultFieldResolver } from 'graphql';
import { wrapWithSynthetics } from './helpers';

const defaultResolver = wrapWithSynthetics(defaultFieldResolver);

export default defaultResolver;
