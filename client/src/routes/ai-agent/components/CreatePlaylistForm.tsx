import React, { useState } from 'react';

interface CreatePlaylistFormProps {
  onCreate: (name: string) => void;
  loading?: boolean;
}

const CreatePlaylistForm: React.FC<CreatePlaylistFormProps> = ({ onCreate, loading }) => {
  const [name, setName] = useState('My AI Playlist');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border rounded px-2 py-1 flex-1 bg-black-base text-primary"
        placeholder="Nome da playlist"
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Create Playlist'}
      </button>
    </form>
  );
};

export default CreatePlaylistForm;
