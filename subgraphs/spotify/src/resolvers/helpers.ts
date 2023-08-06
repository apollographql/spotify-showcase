import { OmitIndexSignature, ValueOf } from 'type-fest';
import {
  ResolversParentTypes,
  Resolver,
  ResolverFn,
} from '../__generated__/resolvers-types';
import { GraphQLError, GraphQLResolveInfo, getArgumentValues } from 'graphql';
import { ContextValue } from '../types/ContextValue';
import { getFieldConfig, identify } from '../fieldConfigs';
import { wait } from '../utils/common';

type ParentTypes = ValueOf<OmitIndexSignature<ResolversParentTypes>>;

export function prop<TParent extends ParentTypes, TKey extends keyof TParent>(
  key: TKey
): Resolver<TParent[TKey], TParent> {
  return (parent: TParent) => parent[key];
}

export function itself<TParent extends ParentTypes>(): Resolver<
  TParent,
  TParent
> {
  return (parent: TParent) => parent;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function wrapWithSynthetics<TResult, TParent = {}, TArgs = {}>(
  resolver: ResolverFn<TResult, TParent, ContextValue, TArgs>
): Resolver<TResult, TParent, ContextValue, TArgs> {
  return async (parent, args, context, info) => {
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

    return resolver(parent, args, context, info);
  };
}

interface SyntheticsDirectiveArguments {
  timeout?: number;
  errorRate?: number;
  enabled: boolean;
}

function getSyntheticsConfig(info: GraphQLResolveInfo) {
  const { config: fieldConfig } = getFieldConfig(
    identify.fromResolverInfo(info)
  );

  const syntheticsDirectiveNode = getDirective('synthetics', info);

  if (!syntheticsDirectiveNode) {
    return {
      timeout: fieldConfig.timeout,
      errorRate: fieldConfig.errorRate,
      enabled: true,
    };
  }

  const args = getArgumentValues(
    info.schema.getDirective('synthetics'),
    syntheticsDirectiveNode
  ) as unknown as SyntheticsDirectiveArguments;

  return {
    timeout: args.timeout ?? fieldConfig.timeout,
    errorRate: args.errorRate ?? fieldConfig.errorRate,
    enabled: args.enabled,
  };
}

function getDirective(name: string, info: GraphQLResolveInfo) {
  return info.fieldNodes
    .flatMap((fieldNode) => fieldNode.directives ?? [])
    .find((directive) => directive.name.value === name);
}
