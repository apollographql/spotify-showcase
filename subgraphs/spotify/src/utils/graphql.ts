import {
  FieldNode,
  GraphQLResolveInfo,
  Kind,
  SelectionSetNode,
  SelectionNode,
} from 'graphql';

export const selectsField = (path: string[], info: GraphQLResolveInfo) => {
  return info.fieldNodes.some((fieldNode) =>
    selectsFieldInNode(path, fieldNode, info)
  );
};

const selectsFieldInNode = (
  path: string[],
  node: FieldNode | SelectionSetNode | SelectionNode | undefined,
  info: GraphQLResolveInfo
): boolean => {
  if (!node) {
    return false;
  }

  const [fieldName, ...rest] = path;

  switch (node.kind) {
    case Kind.FIELD: {
      if (node.name.value !== fieldName) {
        return false;
      }

      return rest.length === 0
        ? true
        : selectsFieldInNode(rest, node.selectionSet, info);
    }
    case Kind.INLINE_FRAGMENT:
      return selectsFieldInNode(path, node.selectionSet, info);
    case Kind.SELECTION_SET:
      return node.selections.some((selection) => {
        return selectsFieldInNode(path, selection, info);
      });
    case Kind.FRAGMENT_SPREAD: {
      const fragment = info.fragments[node.name.value];

      return selectsFieldInNode(path, fragment.selectionSet, info);
    }
  }
};
