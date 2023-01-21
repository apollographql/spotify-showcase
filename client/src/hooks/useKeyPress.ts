import { useEffect, useRef } from 'react';
import useDeepMemo from './useDeepMemo';

type KeyCombination = [modifier: string | null, key: string];

const normalizeKeyCombination = (keys: string): KeyCombination => {
  const [modifier, k] = keys.split(/\s*\+\s*/);

  return k == null ? [null, modifier] : [modifier, k];
};

const matchesModifierKey = (modifier: string | null, event: KeyboardEvent) => {
  switch (modifier) {
    case null:
      return true;
    case 'cmd':
      return event.metaKey || event.ctrlKey;
    case 'ctrl':
      return event.ctrlKey;
    case 'shift':
      return event.shiftKey;
    case 'alt':
      return event.altKey;
    default:
      return false;
  }
};

const matchesAnyCombination = (
  combinations: KeyCombination[],
  event: KeyboardEvent
) => {
  return combinations.some(
    ([modifier, key]) =>
      event.key === key && matchesModifierKey(modifier, event)
  );
};

const isTypingInInput = (event: KeyboardEvent) =>
  (event.target as HTMLElement).matches('input') ||
  (event.target as HTMLElement).matches('textarea');

interface Options {
  ignoreTextInput?: boolean;
}

const useKeyPress = (
  keys: string | string[],
  handler: (event: Event) => void,
  { ignoreTextInput = true }: Options = {}
) => {
  const savedHandler = useRef(handler);
  const combinations = useDeepMemo(
    () =>
      Array.isArray(keys)
        ? keys.map(normalizeKeyCombination)
        : [normalizeKeyCombination(keys ?? '')],
    [keys]
  );

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (ignoreTextInput && isTypingInInput(event)) {
        return;
      }

      if (matchesAnyCombination(combinations, event)) {
        savedHandler.current(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [combinations, ignoreTextInput]);
};

export default useKeyPress;
