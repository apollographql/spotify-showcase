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
import { CSSProperties, Suspense } from 'react';
import CoverPhoto from './CoverPhoto';
import Form from './Form';
import useForm from '../hooks/useForm';
import { withHighlight } from './LoadingStateHighlighter';
import Skeleton from './Skeleton';

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
      description
      images {
        url
      }
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
      <Suspense fallback={<LoadingState />}>
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

  const form = useForm({
    initialValues: { name: playlist?.name, description: playlist?.description },
    onSubmit: () => {
      // TODO: Implement
    },
  });

  if (!playlist) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="text-3xl font-bold">404</div>
        <div className="text-xl">Unable to find playlist</div>
      </div>
    );
  }

  return (
    <Form form={form} className="flex gap-4">
      <CoverPhoto
        animateIn
        image={(playlist.images ?? [])[0]}
        className="row-span-2 flex-1"
      />
      <div className="flex flex-col gap-4 flex-1">
        <Form.TextField
          name="name"
          placeholder="Add a name"
          label="Name"
          autoComplete="off"
        />
        <Form.MultilineTextField
          name="description"
          placeholder="Add an optional description"
          label="Description"
          className="flex-1"
          containerClassName="flex-1"
        />
      </div>
    </Form>
  );
};

interface StyleProps extends CSSProperties {
  '--skeleton-background-color'?: CSSProperties['backgroundColor'];
}

const LoadingState = withHighlight(
  () => {
    return (
      <div
        className="flex gap-4"
        style={
          {
            '--skeleton-background-color': '#181818',
          } as StyleProps
        }
        data-testid="playlist-modal-skeleton"
      >
        <Skeleton.CoverPhoto size="50%" />
        <div className="flex flex-col gap-4 flex-1">
          <Skeleton.Text width="100%" fontSize="1rem" />
          <Skeleton.Text width="100%" fontSize="1rem" />
        </div>
      </div>
    );
  },
  { shade: '#ff2600' }
);

export default PlaylistDetailsModal;
