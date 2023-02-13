export const parseSpotifyIDFromURI = (spotifyURI: string) => {
  const matches = spotifyURI.match(/^spotify:.*?:(.*)$/);

  if (!matches) {
    throw new Error('Could not get Spotify ID from URI');
  }

  return matches[1];
};

export const parseSpotifyTypeFromURI = (spotifyURI: string) => {
  if (/^spotify:user:\w+:collection$/.test(spotifyURI)) {
    return 'collection';
  }

  if (/^spotify:user:\w+:collection:your-episodes$/.test(spotifyURI)) {
    return 'collectionyourepisodes';
  }

  const matches = spotifyURI.match(/^spotify:(.*?):.*$/);

  return matches?.[1];
};

export const parseTypenameFromURI = (spotifyURI: string) => {
  switch (parseSpotifyTypeFromURI(spotifyURI)) {
    case 'episode':
      return 'Episode';
    case 'track':
      return 'Track';
    default:
      return;
  }
};
