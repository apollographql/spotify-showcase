import {
  GraphQLError,
  GraphQLFieldResolver,
  GraphQLResolveInfo,
  getArgumentValues,
} from 'graphql';
import { getDirectiveNode } from './utils/graphql';
import { wait } from './utils/common';

interface SyntheticsDirectiveArguments {
  timeout?: number;
  errorRate?: number;
  enabled: boolean;
}

export function wrapWithSynthetics(
  resolver: GraphQLFieldResolver<unknown, unknown>
): GraphQLFieldResolver<unknown, unknown> {
  return async (source, args, context, info) => {
    const config = getSyntheticsConfig(info);

    if (config.enabled) {
      if (config.timeout > 0) {
        await wait(config.timeout);
      }

      if (Math.random() < config.errorRate) {
        throw new GraphQLError("You've been hit by a synthetic error!", {
          extensions: { code: 'SYNTHETIC_ERROR' },
        });
      }
    }

    return resolver(source, args, context, info);
  };
}

function getSyntheticsConfig(info: GraphQLResolveInfo) {
  const directive = info.schema.getDirective('synthetics');

  if (!directive) {
    throw new Error('`synthetics` directive must be defined in the schema');
  }

  const syntheticsDirectiveNode = getDirectiveNode(info, 'synthetics');

  if (!syntheticsDirectiveNode) {
    return {
      timeout: 0,
      errorRate: 0,
      enabled: true,
    };
  }

  const args = getArgumentValues(
    directive,
    syntheticsDirectiveNode
  ) as unknown as SyntheticsDirectiveArguments;

  return {
    timeout: args.timeout ?? 0,
    errorRate: args.errorRate ?? 0,
    enabled: args.enabled,
  };
}
