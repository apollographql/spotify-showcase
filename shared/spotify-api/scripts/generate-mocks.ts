import { writeFileSync } from 'node:fs';
import { Spotify } from '../src/types';
import path from 'path';
import prettier from 'prettier';

const accessToken = process.env.AUTH;

const BASE_URI = 'https://api.spotify.com';
const FILE_PATH = path.join(__dirname, '../src/mocks.ts');
const ALBUM_IDS = ['4ZaAM16hw3xpp680FJahJJ'];
const USER_IDS = ['31qgjbmjlo4t75pyq6mjqfbl7nja'];
const PLAYLIST_IDS = ['3W6LV9vlZ7fURhLmHqjBlM', '748GuzX7eACeswGoJt6hOw', '6AYofvO5tp5PnDYNAee45O', '4qP1j7LvQSAfNxs9iRei0W'];
const TRACK_IDS = [
  '5kBAk4dSQX4aXbTqjaPvF6', //Space Oddity
  '683hRieVmYdAhVA1DkjSAk', //Space Jam
  '1bcoI2VWqABMDhwoZHf5dp', //Starman
  '1JucQJXvQLH6qRJX0VGfYh', //Allergic to Gravity
  '2CVV8PtUYYsux8XOzWkCP0', //Subterranean Homesick Alien
  '2CzXAeABCmbEB52ZziuMsH', //Seeing  Stars
  '2EoOZnxNgtmZaD8uUmz2nD', //Black Hole Sun
  '2mEhT8wY4VE72wWhLQnGew', //Lazerray
  '2NeSirLM2VHQW4upn0nMfB', //Stgarry Night - Edit
  '2TjdnqlpwOjhijHCwHCP2d', //The Great Gig in the Sky
  '2x5Frs6ts14U4MSLrQQlXg', //Why iii Love The Moon.
  '3skn2lauGk7Dx6bVIt5DVj', //Starlight - Over the moon start
  '3XyC1bFuMZ66GsZLkuZslB', //Dark Star
  '4KROoGIaPaR1pBHPnR3bwC', //Pink Moon
  '4lhhYqzREcts4uOOqWHjRJ', //Apollo
  '4uXCp5l9gZzfaeYaFsEva8', //Heathens
  '4XJgkeu052kEf1AIfXDlHQ', //Star Girl
  '51EMSRpNm9Rg5rGViVCczv', //Andromeda
  '5xYZXIgVAND5sWjN8G0hID', //Go!
  '69WRV2IAqgEcsvJm7YBTJ7', //Ones Who Love You
  '7azVZvIvANuD4sLlwqs2g2', //Starkiller - Over the moon end
  '4WmB04GBqS4xPMYN9dHgBw', //Day One (Interstellar Theme)
  '44CgM5My2vfkSv1KAQuEfk', //Mars
  '6JMwx1TL7XwOeiI6WUY7ud', //Arcadia
  '2dR5WkrpwylTuT3jRWNufa', //Fly Me To The Moon
  '2KHRENHQzTIQ001nlP9Gdc', //Contact
  '3xyTufSSGLP3oZnomceAVW', //Interstellar Overdrive
  '4mZofk9oND0AA4sJfzTH0R', //Your Hand in Mine
  '3lG9eYlhnipGfvAR4ZkBk7', //Zaris
  '3982V8R7oW3xyV8zASbCGG', //The Race For Space - The Race For Space Start
  '4EhQrGzqi8k24qWIJuG5CH', //Sputnik
  '4IaRxPHdzLJ78tm7lxg9M8', //Gagarin
  '6SONXH9dJQgDY9vCjdkZfK', //Fire In The Cockpit
  '52KMWPHDL84oo2Ncj3O6RX', //E.V.A
  '3jjMyq44OIjNgmpXLhpw7W', //The Other Side
  '5Um9ghqMlKALp9AcRMIk7B', //Valentina
  '5xYZXIgVAND5sWjN8G0hID', //Go!
  '5ERrJuNLnmHj525ooOKyqJ', //Tomorrow - The Race For Space Start End
];
const EPISODE_IDS = [
    '1Wq3HgaoISjc9ZUmXdbaSK',
    '53GQ1LSSLptukYmHW96UQe',
    '5zOi1QrfEldKskg9MnW7tQ',
    '2nuhXq3YEQAI8BCDN6Dzex',
    '2Mmay1mmdUm9X6bjQVV6PE',
    '3PeTcQOTOTpWoz6zYxZ3qP',
];

if (!accessToken) {
  throw new Error('Please set a valid access as the `AUTH` env var');
}

interface DataStore {
  albums: Record<string, Spotify.Object.Album>;
  artists: Record<string, Spotify.Object.Artist>;
  episodes: Record<string, Spotify.Object.Episode>;
  playlists: Record<string, Spotify.Object.Playlist>;
  tracks: Record<string, Spotify.Object.Track>;
  genres: string[];
  shows: Record<string, Spotify.Object.Show>;
  users: Record<string, Spotify.Object.User>;
}

const store: DataStore = {
  albums: {},
  artists: {},
  episodes: {},
  playlists: {},
  tracks: {},
  genres: [],
  shows: {},
  users: {},
};

async function main() {
  for (const id of TRACK_IDS) {
    await getTrack(id);
  }

  for (const id of PLAYLIST_IDS) {
    await getPlaylist(id);
  }

  for (const id of ALBUM_IDS) {
    await getAlbum(id);
  }

  for (const id of USER_IDS) {
    await getUser(id);
  }

  for (const id of EPISODE_IDS) {
    await getEpisode(id);
  }

  store.genres = await getGenres();

  const content = `import { Spotify } from 'spotify-api';

export const mocks: {
  albums: Record<string, Spotify.Object.Album>;
  artists: Record<string, Spotify.Object.Artist>;
  episodes: Record<string, Spotify.Object.Episode>;
  playlists: Record<string, Spotify.Object.Playlist>;
  tracks: Record<string, Spotify.Object.Track>;
  genres: string[];
  users: Record<string, Spotify.Object.User>;
  shows: Record<string, Spotify.Object.Show>;
} = ${JSON.stringify(store, null, 2)}`;

  writeFileSync(FILE_PATH, await format(content, { parser: 'typescript' }), {
    encoding: 'utf-8',
  });
}

async function getGenres() {
  return get('/recommendations/available-genre-seeds').then(
    (list) => list.genres
  );
}

async function getPlaylist(id: string) {
  return (store.playlists[id] ||= await get('/playlists/:id', { id }));
}

async function getAlbum(id: string) {
  return tap(
    (store.albums[id] ||= await get('/albums/:id', { id })),
    async (album) => {
      await Promise.all([
        ...album.artists.map((artist) => getArtist(artist.id)),
        ...album.tracks.items.map((track) => getTrack(track.id)),
      ]);
    }
  );
}

async function getArtist(id: string) {
  return (store.artists[id] ||= await get('/artists/:id', { id }));
}

async function getUser(id: string) {
    return (store.users[id] ||= await get('/users/:id', { id }));
}

async function getTrack(id: string) {
  return tap(
    (store.tracks[id] ||= await get('/tracks/:id', { id })),
    async (track) => {
      await Promise.all(track.artists.map((artist) => getArtist(artist.id)));
    }
  );
}

async function getEpisode(id: string) {
  return tap(
    (store.episodes[id] ||= await get('/episodes/:id', { id })),
    async (episode) => {
        episode.show = await getShow(episode.show.id);
    }
    );
}

async function getShow(id: string) {
    return (store.shows[id] ||= await get('/shows/:id', { id }));
}

async function get<Pathname extends keyof Spotify.Response.GET>(
  pathname: Pathname,
  params?: Record<string, string>
): Promise<Spotify.Response.GET[Pathname]> {
  const uri = path.join(
    BASE_URI,
    'v1',
    replaceUrlParams(pathname, params ?? {})
  );

  const res = await fetch(uri, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  console.log(`GET ${uri} ${res.status}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${res.status} ${data.error.message}`);
  }

  return data;
}

function replaceUrlParams(pathname: string, params: Record<string, string>) {
  return pathname.replace(/(?<=\/):(\w+)/g, (_, name) => {
    return params[name];
  });
}

function tap<T>(value: T, fn: (value: T) => void) {
  fn(value);
  return value;
}

async function format(code: string, options?: prettier.Options) {
  const configFile = await prettier.resolveConfigFile();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const formatOptions = await prettier.resolveConfig(configFile!);

  return prettier.format(code, { ...options, ...formatOptions });
}

main();
