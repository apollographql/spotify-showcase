import { GraphQLResolveInfo } from 'graphql';

export function getDirectiveNode(info: GraphQLResolveInfo, name: string) {
  return info.fieldNodes
    .flatMap((fieldNode) => fieldNode.directives ?? [])
    .find((directiveNode) => directiveNode.name.value === name);
}
