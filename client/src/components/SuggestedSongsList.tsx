import React from 'react';
import { SuggestedSong } from '../types/suggestedSong';

interface SuggestedSongsListProps {
  songs: SuggestedSong[];
  onRemove: (id: string) => void;
}

const SuggestedSongsList: React.FC<SuggestedSongsListProps> = ({ songs, onRemove }) => {
  if (songs.length === 0) {
    return <div className="text-gray-400 text-center py-4">No suggestions yet.</div>;
  }
  return (
    <ul className="rounded-lg overflow-hidden shadow border border-gray-700 bg-black-base">
      {songs.map(song => (
        <li
          key={song.id}
          className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 transition-colors border-b border-gray-700 last:border-b-0"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded shadow flex items-center justify-center text-white font-bold text-lg">
            <svg width={20} height={20} fill="none" viewBox="0 0 24 24">
              <circle cx={12} cy={12} r={10} fill="#1db954" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="truncate font-semibold text-primary">{song.name}</div>
            <div className="truncate text-sm text-gray-400">{song.artist}</div>
          </div>
          <button
            className="ml-2 p-2 rounded-full bg-transparent hover:bg-gray-700 focus:bg-gray-700 focus:outline-none transition-colors"
            onClick={() => onRemove(song.id)}
            aria-label={`Remove ${song.name} by ${song.artist}`}
            title="Remove from suggestions"
          >
            <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
              <path d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z" stroke="#b3b3b3" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 11v6M14 11v6" stroke="#b3b3b3" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SuggestedSongsList;
