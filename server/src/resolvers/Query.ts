import { QueryResolvers } from './types';
import { format } from 'date-fns';
import { maybe } from '../utils/common';

const resolvers: QueryResolvers = {
  album: (_, { id }, { dataSources }) => dataSources.spotify.getAlbum(id),
  albums: async (_, { ids }, { dataSources }) => {
    const { albums } = await dataSources.spotify.getAlbums({
      ids: ids.join(','),
    });

    return albums;
  },
  artist: (_, { id }, { dataSources }) => dataSources.spotify.getArtist(id),
  artists: async (_, { ids }, { dataSources }) => {
    const { artists } = await dataSources.spotify.getArtists({
      ids: ids.join(','),
    });

    return artists;
  },
  developer: () => {
    // Return empty object since this field is used as a namespace
    return {};
  },
  episode: (_, { id }, { dataSources }) => dataSources.spotify.getEpisode(id),
  episodes: async (_, { ids }, { dataSources }) => {
    const { episodes } = await dataSources.spotify.getEpisodes({
      ids: ids.join(','),
    });

    return episodes;
  },
  featuredPlaylists: (_, { limit, offset, timestamp }, { dataSources }) => {
    return dataSources.spotify.getFeaturedPlaylists({
      limit: limit ?? undefined,
      offset: offset ?? undefined,
      timestamp: timestamp
        ? format(timestamp, "yyyy-LL-dd'T'HH:mm:ss")
        : undefined,
    });
  },
  genres: async (_, __, { dataSources }) => {
    const { genres } = await dataSources.spotify.getGenres();

    return genres;
  },
  me: (_, __, { dataSources }) => dataSources.spotify.getCurrentUser(),
  newReleases: (_, { country, limit, offset }, { dataSources }) => {
    return dataSources.spotify.getNewReleases({
      country: maybe(country),
      limit: maybe(limit),
      offset: maybe(offset),
    });
  },
  recommendations: async (
    _,
    {
      acousticness,
      danceability,
      durationMs,
      energy,
      instrumentalness,
      liveness,
      loudness,
      mode,
      popularity,
      speechiness,
      tempo,
      timeSignature,
      valence,
      seeds,
      limit,
    },
    { dataSources }
  ) => {
    return dataSources.spotify.getRecommendations({
      limit: maybe(limit),
      seed_artists: seeds.seedArtists?.join(','),
      seed_genres: seeds.seedGenres?.join(','),
      seed_tracks: seeds.seedTracks?.join(','),
      max_acousticness: maybe(acousticness?.max),
      max_danceability: maybe(danceability?.max),
      max_duration_ms: maybe(durationMs?.max),
      max_energy: maybe(energy?.max),
      max_instrumentalness: maybe(instrumentalness?.max),
      max_key: maybe(instrumentalness?.max),
      max_liveness: maybe(liveness?.max),
      max_loudness: maybe(loudness?.max),
      max_mode: maybe(mode?.max),
      max_popularity: maybe(popularity?.max),
      max_speechiness: maybe(speechiness?.max),
      max_tempo: maybe(tempo?.max),
      max_time_signature: maybe(timeSignature?.max),
      max_valence: maybe(valence?.max),
      min_acousticness: maybe(acousticness?.min),
      min_danceability: maybe(danceability?.min),
      min_duration_ms: maybe(durationMs?.min),
      min_energy: maybe(energy?.min),
      min_instrumentalness: maybe(instrumentalness?.min),
      min_key: maybe(instrumentalness?.min),
      min_liveness: maybe(liveness?.min),
      min_loudness: maybe(loudness?.min),
      min_mode: maybe(mode?.min),
      min_popularity: maybe(popularity?.min),
      min_speechiness: maybe(speechiness?.min),
      min_tempo: maybe(tempo?.min),
      min_time_signature: maybe(timeSignature?.min),
      min_valence: maybe(valence?.min),
      target_acousticness: maybe(acousticness?.target),
      target_danceability: maybe(danceability?.target),
      target_duration_ms: maybe(durationMs?.target),
      target_energy: maybe(energy?.target),
      target_instrumentalness: maybe(instrumentalness?.target),
      target_key: maybe(instrumentalness?.target),
      target_liveness: maybe(liveness?.target),
      target_loudness: maybe(loudness?.target),
      target_mode: maybe(mode?.target),
      target_popularity: maybe(popularity?.target),
      target_speechiness: maybe(speechiness?.target),
      target_tempo: maybe(tempo?.target),
      target_time_signature: maybe(timeSignature?.target),
      target_valence: maybe(valence?.target),
    });
  },
  playlist: (_, { id }, { dataSources }) => {
    // Intentionally omit tracks. This is an optimal place for @defer and
    // provides a nice learning area
    return dataSources.spotify.getPlaylist(id, {
      fields:
        'id,collaborative,description,external_urls,images,name,owner,public,uri',
    });
  },
  show: (_, { id }, { dataSources }) => dataSources.spotify.getShow(id),
  shows: async (_, { ids }, { dataSources }) => {
    const { shows } = await dataSources.spotify.getShows({
      ids: ids.join(','),
    });

    return shows;
  },
  track: (_, { id }, { dataSources }) => {
    return dataSources.spotify.getTrack(id);
  },
  tracks: async (_, { ids }, { dataSources }) => {
    const { tracks } = await dataSources.spotify.getTracks({
      ids: ids.join(','),
    });

    return tracks;
  },
  tracksAudioFeatures: async (_, { ids }, { dataSources }) => {
    const { audio_features } = await dataSources.spotify.getTracksAudioFeatures(
      { ids: ids.join(',') }
    );

    return audio_features;
  },
};

export default resolvers;
