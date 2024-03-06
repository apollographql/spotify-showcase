import {
  QueryReference,
  TypedDocumentNode,
  gql,
  useReadQuery,
} from '@apollo/client';
import {
  PlaylistDetailsModalQuery,
  PlaylistDetailsModalQueryVariables,
} from '../types/api';
import Modal from './Modal';
import { Suspense } from 'react';

interface PlaylistDetailsModalProps {
  queryRef: QueryReference<PlaylistDetailsModalQuery> | null;
  open: boolean;
  onChange: (open: boolean) => void;
}

export const PLAYLIST_DETAILS_MODAL_QUERY: TypedDocumentNode<
  PlaylistDetailsModalQuery,
  PlaylistDetailsModalQueryVariables
> = gql`
  query PlaylistDetailsModalQuery($id: ID!) {
    playlist(id: $id) {
      id
      name
    }
  }
`;

const PlaylistDetailsModal = ({
  queryRef,
  open,
  onChange,
}: PlaylistDetailsModalProps) => {
  return (
    <Modal open={open} onChange={onChange} title="Edit details">
      <Suspense fallback="Loading...">
        {queryRef && <PlaylistDetails queryRef={queryRef} />}
      </Suspense>
    </Modal>
  );
};

interface PlaylistDetailsProps {
  queryRef: QueryReference<PlaylistDetailsModalQuery>;
}

const PlaylistDetails = ({ queryRef }: PlaylistDetailsProps) => {
  const { data } = useReadQuery(queryRef);
  const { playlist } = data;

  if (!playlist) {
    return <div>Error!</div>;
  }

  return <div>{playlist.name}</div>;
};

export default PlaylistDetailsModal;
