const accessToken = process.env.AUTH;
const { writeFileSync } = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '../src/mocks.ts');

if (!accessToken) {
  throw new Error('Please set a valid access as the `AUTH` env var');
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const mockedData = {
  tracks: [],
  albums: [],
  playlists: [],
};

async function main() {
  const playlistIds = ['3W6LV9vlZ7fURhLmHqjBlM'];
  const albumIds = ['4ZaAM16hw3xpp680FJahJJ'];
  const songIds = [
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
  for (var i = 0; i < songIds.length; i++) {
    const track = await getTrack(songIds[i]);
    mockedData.tracks.push(track);
    await sleep(2000);
  }

  for (var i = 0; i < playlistIds.length; i++) {
    const playlist = await getPlaylist(playlistIds[i]);
    mockedData.playlists.push(playlist);
    await sleep(2000);
  }

  for (var i = 0; i < albumIds.length; i++) {
    const album = await getAlbum(albumIds[i]);
    mockedData.albums.push(album);
  }

  const content = `import { Spotify } from 'spotify-api';

export const mocks: {
  tracks: any[];
  playlists: any[];
  albums: any[];
} = ${JSON.stringify(mockedData, null, 2)}`;

  writeFileSync(FILE_PATH, content, { encoding: 'utf-8' });
}

async function getPlaylist(id) {
  const playlist = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    method: 'GET',
  }).then((res) => res.json());

  playlist.tracks.items = await Promise.all(
    playlist.tracks.items.map((item) => ({
      ...item,
      track: mockedData.tracks.find((t) => t.id == item.id),
    }))
  );

  return playlist;
}

async function getAlbum(id) {
  const album = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    method: 'GET',
  }).then((res) => res.json());

  album.artists = await Promise.all(
    album.artists.map((artist) => getArtist(artist.id))
  );
  album.tracks.items = await Promise.all(
    album.tracks.items.map((item) => ({
      ...item,
      track: mockedData.tracks.find((t) => t.id == item.id),
    }))
  );

  return album;
}

async function getArtist(id) {
  return await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    method: 'GET',
  }).then((res) => res.json());
}

async function getTrack(id) {
  const track = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    method: 'GET',
  }).then((res) => res.json());

  track.artists = await Promise.all(
    track.artists.map((artist) => getArtist(artist.id))
  );

  return track;
}

main();
