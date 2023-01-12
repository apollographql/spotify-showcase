import { useEffect, useState } from 'react';
import useInterval from './useInterval';
import useDidUpdateValue from './useDidUpdateValue';

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
  playbackState: PlaybackState | null | undefined,
  { max }: { max: number }
) => {
  const isPlaying = playbackState?.isPlaying ?? false;
  const progressMs = playbackState?.progressMs ?? 0;
  const timestamp = playbackState?.timestamp;
  const [adjustedProgressMs, setAdjustedProgressMs] = useState(progressMs);

  useInterval(() => {
    if (isPlaying && timestamp != null) {
      setAdjustedProgressMs(progressMs + (Date.now() - timestamp));
    }
  }, 1000);

  // Immediately update to the most recent progress when play status changes
  useDidUpdateValue(isPlaying, () => setAdjustedProgressMs(progressMs));

  // When the user seeks inside the track, we want to more immediately update
  // the value than waiting for the next tick of the interval.
  useEffect(() => {
    if (Math.abs(adjustedProgressMs - progressMs) > 1000) {
      setAdjustedProgressMs(progressMs);
    }
  }, [adjustedProgressMs, progressMs]);

  // TODO: Determine why adjusted progress jumps beyond max duration first
  // mounting
  return Math.min(max, adjustedProgressMs);
};

export default usePlaybackProgress;
