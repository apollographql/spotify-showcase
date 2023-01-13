export const parseSpotifyIDFromURI = (spotifyURI: string) => {
  const matches = spotifyURI.match(/^spotify:.*?:(.*)$/);

  return matches?.[1];
};
