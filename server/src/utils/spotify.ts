export const parseSpotifyIDFromURI = (spotifyURI: string) => {
  const matches = spotifyURI.match(/^spotify:.*?:(.*)$/);

  if (!matches) {
    throw new Error('Could not parse ID from Spotify URI');
  }

  return matches[1];
};
