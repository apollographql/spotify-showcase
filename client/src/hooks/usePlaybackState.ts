import { DocumentNode, TypedDocumentNode, OperationVariables } from '@apollo/client';
import { useFragment } from "@apollo/client/react";
import { DefinitionNode, FragmentDefinitionNode, Kind } from 'graphql';

interface Options<TData> {
  fragment: DocumentNode | TypedDocumentNode<TData>;
}

const usePlaybackState = <TData>({ fragment }: Options<TData>) => {
  const { data, complete } = useFragment<TData, OperationVariables>({
    fragment,
    fragmentName: getFragmentName(fragment),
    from: { __typename: 'PlaybackState' },
  });

  return complete ? data : null;
};

const isFragmentDefinition = (
  node: DefinitionNode
): node is FragmentDefinitionNode => node.kind === Kind.FRAGMENT_DEFINITION;

const getFragmentName = (node: DocumentNode) => {
  const fragmentNode = node.definitions.find(isFragmentDefinition);

  if (!fragmentNode) {
    throw new Error('Fragment must contain a definition');
  }

  return fragmentNode.name.value;
};

export default usePlaybackState;
