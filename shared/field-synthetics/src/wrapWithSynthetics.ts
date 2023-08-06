import {
  GraphQLError,
  GraphQLFieldResolver,
  GraphQLResolveInfo,
  getArgumentValues,
} from 'graphql';
import { getDirectiveNode } from './utils/graphql';
import { wait } from './utils/common';
import { getFieldConfig, fromResolverInfo } from './fieldConfigs';

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
  const { config: fieldConfig } = getFieldConfig(fromResolverInfo(info));
  const directiveConfig = getSyntheticsConfigFromDirective(info);

  return {
    timeout: directiveConfig?.timeout ?? fieldConfig.timeout,
    errorRate: directiveConfig?.errorRate ?? fieldConfig.errorRate,
    enabled: directiveConfig?.enabled ?? true,
  };
}

function getSyntheticsConfigFromDirective(info: GraphQLResolveInfo) {
  const directive = info.schema.getDirective('synthetics');

  if (!directive) {
    throw new Error('`synthetics` directive must be added to the schema');
  }

  const node = getDirectiveNode(info, 'synthetics');

  if (!node) {
    return;
  }

  const args = getArgumentValues(
    directive,
    node
  ) as unknown as SyntheticsDirectiveArguments;

  return {
    timeout: args.timeout,
    errorRate: args.errorRate,
    enabled: args.enabled,
  };
}
