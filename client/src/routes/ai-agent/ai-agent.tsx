import { AnimatePresence, motion } from 'framer-motion';
const PROMPT_SUGGESTIONS = [
    'Chill for study',
    'Energetic workout',
    'Indie hits 2010s',
    'Classic rock roadtrip',
    'Jazz for dinner',
    'Brazilian party',
    'Focus electronic',
    'Romantic evening',
    'Upbeat pop',
    'Relaxing acoustic',
];
import SuggestedSongsList from '../../components/SuggestedSongsList';
import { mockSuggestedSongs, SuggestedSong } from '../../types/suggestedSong';
import { getAccessToken } from '../../auth';
// ---
// AI Agent Response Model (for backend integration)
// This is the expected response array for song suggestions:
// [
//   { id: string, name: string, artist: string }
// ]
// Example:
// [
//   { id: '3n3Ppam7vgaVa1iaRUc9Lp', name: 'Hey Ya!', artist: 'Outkast' },
//   { id: '7ouMYWpwJ422jRcDASZB7P', name: 'Feel Good Inc.', artist: 'Gorillaz' },
//   { id: '0eGsygTp906u18L0Oimnem', name: 'Lose Yourself', artist: 'Eminem' }
// ]

const PLAYLISTS_QUERY = gql`
    query MyPlaylists($limit: Int) {
        me {
            playlists(limit: $limit) {
                edges { node { id name } }
            }
        }
    }
`;
import React, { useState } from 'react';
import useAddToPlaylistMutation from '../../mutations/useAddToPlaylistMutation';
import useCreatePlaylistMutation from '../../mutations/useCreatePlaylistMutation';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

export const RouteComponent = () => {
    const [prompt, setPrompt] = useState('');
    const [suggestedSongs, setSuggestedSongs] = useState<Array<{ id: string; name: string; artist: string }>>([]);
    const [loading, setLoading] = useState(false);
    const [playlistCreated, setPlaylistCreated] = useState(false);
    const [creatingPlaylist, setCreatingPlaylist] = useState(false);

    const { data: playlistsData, refetch } = useQuery<{ me?: { playlists?: { edges?: Array<{ node: { id: string; name: string } }> } } }>(PLAYLISTS_QUERY, { variables: { limit: 50 } });
    const playlists = playlistsData?.me?.playlists?.edges?.map((e: any) => e.node) || [];

    const [createPlaylist] = useCreatePlaylistMutation();

    const [addToPlaylist] = useAddToPlaylistMutation();

    const handleSendPrompt = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setPlaylistCreated(false);
        try {
            const token = await getAccessToken();
            if (!token) throw new Error('Spotify token not found');
                const apiBase = import.meta.env.VITE_AI_AGENT_HOST;
                const response = await fetch(`${apiBase}/api/suggest-playlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({ query: prompt }),
            });
            if (!response.ok) throw new Error('Failed to fetch suggestions');
            const data = await response.json();
            setSuggestedSongs(data.result || []);
        } catch (err) {
            alert('Failed to get suggestions from AI agent.');
        }
        setLoading(false);
    };

    const handleCreatePlaylist = async () => {
        if (!suggestedSongs.length) return;
        setCreatingPlaylist(true);
        setPlaylistCreated(false);

        try {
            const playlistName = prompt || 'My AI Playlist';
            const { data } = await createPlaylist({
                name: playlistName,
                description: 'This playlist was automatically created by an AI agent based on your prompt.',
            });
            const playlistId = data?.createPlaylist?.playlist?.id;
            if (!playlistId) throw new Error('Failed to create playlist');

            const uris = suggestedSongs.map(song => `spotify:track:${song.id}`);
            await addToPlaylist({ playlistId, uris });
            setPlaylistCreated(true);
            // Atualiza a lista de playlists no menu lateral
            if (typeof refetch === 'function') {
                refetch();
            }
        } catch (e) {
            alert('Failed to create playlist or add songs.');
        }
        setCreatingPlaylist(false);
    };

    return (
        <div className="max-w-xl mx-auto p-4 mt-8">
            <h1 className="text-2xl font-bold mb-2">AI Agent</h1>
            <p className="text-gray-400 mb-6">Ask the agent to create a playlist based on a prompt, such as "chill for studying", "80s hits", or any mood/theme you want. The agent will suggest songs and automatically create the playlist for you.</p>
            <form onSubmit={handleSendPrompt} className="flex gap-2 mb-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    className="border rounded px-2 py-1 flex-1 bg-black-base text-primary"
                    placeholder="E.g.: study songs, upbeat, 80s..."
                    disabled={loading}
                />
                <button
                    type="submit"
                    style={{
                        background: 'var(--color--green)',
                        color: 'var(--color--white)',
                    }}
                    className="flex items-center gap-2 px-5 py-2 rounded-full font-bold shadow transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400"
                    disabled={loading || !prompt.trim()}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin" width={18} height={18} fill="none" viewBox="0 0 24 24">
                                <circle cx={12} cy={12} r={10} stroke="#fff" strokeWidth={3} opacity={0.2} />
                                <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth={3} />
                            </svg>
                            Sending...
                        </>
                    ) : (
                        <>
                            <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
                                <path d="M4 12h16M13 5l7 7-7 7" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Send
                        </>
                    )}
                </button>
            </form>

            <div className="mb-6">
                <div className="text-xs text-gray-400 mb-2">Try one of these prompts:</div>
                <div className="flex flex-wrap gap-2">
                    {PROMPT_SUGGESTIONS.map(suggestion => (
                        <button
                            key={suggestion}
                            type="button"
                            className="px-3 py-1 rounded-full bg-gray-800 hover:bg-green-600 text-gray-200 hover:text-white text-xs transition-colors border border-gray-700 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                            onClick={() => setPrompt(suggestion)}
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {suggestedSongs.length > 0 && (
                    <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-lg font-semibold mb-4">Suggestions</h2>
                        <SuggestedSongsList
                            songs={suggestedSongs}
                            onRemove={id => setSuggestedSongs(songs => songs.filter(s => s.id !== id))}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {suggestedSongs.length > 0 && (
                <button
                    onClick={handleCreatePlaylist}
                    style={{
                        background: 'var(--color--green)',
                        color: 'var(--color--white)',
                    }}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg text-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400"
                    disabled={creatingPlaylist}
                >
                    {creatingPlaylist ? (
                        <>
                            <svg className="animate-spin" width={18} height={18} fill="none" viewBox="0 0 24 24">
                                <circle cx={12} cy={12} r={10} stroke="#fff" strokeWidth={3} opacity={0.2} />
                                <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth={3} />
                            </svg>
                            Creating...
                        </>
                    ) : (
                        <>Create Playlist</>
                    )}
                </button>
            )}

            {playlistCreated && (
                <div className="mt-4 text-green-500 font-semibold text-center">Playlist created successfully!</div>
            )}
        </div>
    );
};