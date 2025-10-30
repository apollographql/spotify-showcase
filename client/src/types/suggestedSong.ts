// SuggestedSong model for AI Agent suggestions
export interface SuggestedSong {
  id: string;
  name: string;
  artist: string;
}

// Example mock data for UI development
export const mockSuggestedSongs: SuggestedSong[] = [
  { id: '3n3Ppam7vgaVa1iaRUc9Lp', name: 'Hey Ya!', artist: 'Outkast' },
  { id: '7ouMYWpwJ422jRcDASZB7P', name: 'Feel Good Inc.', artist: 'Gorillaz' },
  { id: '0eGsygTp906u18L0Oimnem', name: 'Lose Yourself', artist: 'Eminem' },
];
