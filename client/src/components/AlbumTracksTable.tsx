import {
  FragmentType,
  TypedDocumentNode,
  gql,
  useFragment,
} from '@apollo/client';
import { createColumnHelper } from '@tanstack/react-table';
import { Clock } from 'lucide-react';
import { Get } from 'type-fest';
import { AlbumTracksTable_album as Album } from '../types/api';
import AlbumTrackTitleCell from './AlbumTrackTitleCell';
import ContextMenu from './ContextMenu';
import ContextMenuAction from './ContextMenuAction';
import Duration from './Duration';
import Table from './Table';
import TrackNumberCell from './TrackNumberCell';
import useResumePlaybackMutation from '../mutations/useResumePlaybackMutation';
import { useMemo } from 'react';
import TrackLikeButtonCell from './TrackLikeButtonCell';
import { fragmentRegistry } from '../apollo/fragmentRegistry';

type Track = NonNullable<Get<Album, 'tracks.edges[0].node'>>;

interface AlbumTracksTableProps {
  album: FragmentType<Album>;
  tracksContains: Map<string, boolean>;
}

interface AlbumTracksTableMeta {
  tracksContains: Map<string, boolean>;
}

const AlbumTracksTableFragment: TypedDocumentNode<Album> = gql`
  fragment AlbumTracksTable_album on Album {
    id
    uri
    tracks {
      edges {
        node {
          id
          uri
          durationMs
          trackNumber
          artists {
            id
          }

          ...AlbumTrackTitleCell_track @unmask(mode: "migrate")
        }
      }
    }

    ...AlbumTrackTitleCell_album @unmask(mode: "migrate")
  }
`;

fragmentRegistry.register(AlbumTracksTableFragment);

const columnHelper = createColumnHelper<Track>();

const AlbumTracksTable = ({ album, tracksContains }: AlbumTracksTableProps) => {
  const { data, complete } = useFragment({
    fragment: AlbumTracksTableFragment,
    from: album,
  });
  const [resumePlayback] = useResumePlaybackMutation();

  const columns = useMemo(
    () =>
      complete
        ? [
            columnHelper.accessor((track) => track, {
              header: '#',
              meta: { shrink: true },
              cell: (info) => {
                return (
                  <TrackNumberCell
                    context={data}
                    track={info.getValue()}
                    position={info.row.index}
                  />
                );
              },
            }),
            columnHelper.display({
              id: 'title',
              header: 'Title',
              cell: (info) => {
                return (
                  <AlbumTrackTitleCell album={data} track={info.row.original} />
                );
              },
            }),
            columnHelper.display({
              id: 'liked',
              header: '',
              cell: (info) => {
                const { tracksContains } = info.table.options
                  .meta as unknown as AlbumTracksTableMeta;

                const track = info.row.original;
                const liked = tracksContains.get(track.id) ?? false;

                return <TrackLikeButtonCell liked={liked} track={track} />;
              },
              meta: {
                shrink: true,
              },
            }),
            columnHelper.accessor('durationMs', {
              header: () => <Clock size="1rem" />,
              cell: (info) => <Duration durationMs={info.getValue()} />,
              meta: {
                headerAlign: 'right',
                shrink: true,
              },
            }),
          ]
        : [],
    [data]
  );

  if (!complete) {
    return null;
  }

  return (
    <Table
      enableRowSelection
      enableMultiSelect
      enableRangeSelect
      columns={columns}
      data={data.tracks?.edges.map((edge) => edge.node) ?? []}
      meta={{ tracksContains }}
      onDoubleClickRow={(row) => {
        const track = row.original;

        resumePlayback({
          contextUri: data.uri,
          offset: { uri: track.uri },
        });
      }}
      contextMenu={(rows) => {
        const tracks = rows.map((row) => row.original);
        const uris = tracks.map((track) => track.uri);
        const ids = tracks.map((track) => track.id);
        const areAllSavedTracks = tracks.every((track) =>
          tracksContains.get(track.id)
        );

        if (tracks.length > 1) {
          return (
            <>
              <ContextMenuAction.AddToQueue uris={uris} />
              {areAllSavedTracks ? (
                <ContextMenuAction.RemoveSavedTracks ids={ids} />
              ) : (
                <ContextMenuAction.SaveTracks ids={ids} />
              )}
              <ContextMenuAction.AddToPlaylist uris={uris} />
            </>
          );
        }

        const [track] = tracks;

        return (
          <>
            <ContextMenuAction.AddToQueue uri={track.uri} />
            <ContextMenu.Separator />
            <ContextMenuAction.LinkToArtist artists={track.artists} />
            <ContextMenu.Separator />
            {tracksContains.get(track.id) ? (
              <ContextMenuAction.RemoveSavedTracks ids={[track.id]} />
            ) : (
              <ContextMenuAction.SaveTracks ids={[track.id]} />
            )}
            <ContextMenuAction.AddToPlaylist uri={track.uri} />
            <ContextMenu.Separator />
            <ContextMenu.SubMenu
              content={<ContextMenuAction.CopyLinkToEntity entity={track} />}
            >
              Share
            </ContextMenu.SubMenu>
            <ContextMenu.Separator />
            <ContextMenuAction.OpenDesktopApp uri={track.uri} context={data} />
          </>
        );
      }}
    />
  );
};

export default AlbumTracksTable;
