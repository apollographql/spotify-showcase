import { useEffect, useState } from 'react';
import useInterval from './useInterval';

interface PlaybackState {
  isPlaying: boolean;
  progressMs: number | null;
  timestamp: number;
}

// Return a more accurate timestamp by accounting for network latency. While
// we hope the subscription would ping every second when the track is playing,
// we aren't guaranteed of that. We can account for this latency by running our
// own timer that updates progress every second to simulate the passage of time.
// Once the "real" timestamp is updated from the server, it will adjust if needed.
const usePlaybackProgress = (
  playbackState: PlaybackState | null | undefined
) => {
  const progressMs = playbackState?.progressMs ?? 0;
  const remoteTimestamp = playbackState?.timestamp;
  const [adjustedProgressMs, setAdjustedProgressMs] = useState(progressMs);
  const [timestamp, setTimestamp] = useState(remoteTimestamp);

  useInterval(
    () => {
      if (timestamp != null) {
        setAdjustedProgressMs(progressMs + (Date.now() - timestamp));
      }
    },
    playbackState?.isPlaying ? 1000 : null
  );

  useEffect(() => {
    setAdjustedProgressMs(progressMs);
  }, [progressMs]);

  useEffect(() => {
    if (remoteTimestamp) {
      setTimestamp(remoteTimestamp);
    }
  }, [remoteTimestamp]);

  return adjustedProgressMs;
};

export default usePlaybackProgress;
