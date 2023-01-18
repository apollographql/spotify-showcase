export const parseSpotifyIDFromURI = (spotifyURI: string) => {
  const matches = spotifyURI.match(/^spotify:.*?:(.*)$/);

  return matches?.[1];
};

export const parseSpotifyTypeFromURI = (spotifyURI: string) => {
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
