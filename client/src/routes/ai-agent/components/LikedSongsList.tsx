import React from 'react';

interface LikedSongsListProps {
  songs: Array<{ id: string; name: string; artist: string }>;
}

const LikedSongsList: React.FC<LikedSongsListProps> = ({ songs }) => {
  if (!songs.length) {
    return <div>Nenhuma música curtida encontrada.</div>;
  }
  return (
    <ul className="divide-y divide-gray-700">
      {songs.map((song) => (
        <li key={song.id} className="py-2">
          <span className="font-semibold">{song.name}</span> — {song.artist}
        </li>
      ))}
    </ul>
  );
};

export default LikedSongsList;
