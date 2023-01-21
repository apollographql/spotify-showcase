import { useEffect, useRef } from 'react';
import useDeepMemo from './useDeepMemo';

type KeyCombination = [modifier: string | null, key: string];

const KEY_ALIASES: Record<string, string> = {
  cmd: 'Meta',
  ctrl: 'Control',
  shift: 'Shift',
  alt: 'alt',
};

const normalizeKey = (key: string) => {
  return KEY_ALIASES[key] || key;
};

const normalizeKeyCombination = (keys: string): KeyCombination => {
  const [modifier, key] = keys.split(/\s*\+\s*/);

  return key == null
    ? [null, normalizeKey(modifier)]
    : [modifier, normalizeKey(key)];
};

const matchesModifier = (modifier: string | null, event: KeyboardEvent) => {
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
  return combinations.some(([modifier, key]) => {
    return matchesModifier(modifier, event) && event.key === key;
  });
};

const isTypingInInput = (event: KeyboardEvent) =>
  (event.target as HTMLElement).matches('input') ||
  (event.target as HTMLElement).matches('textarea');

interface Options {
  ignoreTextInput?: boolean;
  keyup?: boolean;
  keydown?: boolean;
}

type KeyPressHandler = (event: KeyboardEvent) => void;

const useKeyPress = (
  keys: string | string[],
  handler: KeyPressHandler,
  { ignoreTextInput = true, keyup = false, keydown = true }: Options = {}
) => {
  const handlerRef = useRef(handler);
  const combinations = useDeepMemo(
    () =>
      Array.isArray(keys)
        ? keys.map(normalizeKeyCombination)
        : [normalizeKeyCombination(keys ?? '')],
    [keys]
  );

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (ignoreTextInput && isTypingInInput(event)) {
        return;
      }

      if (matchesAnyCombination(combinations, event)) {
        handlerRef.current(event);
      }
    };

    if (keydown) {
      document.addEventListener('keydown', handleKeyPress);
    }

    if (keyup) {
      document.addEventListener('keyup', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyPress);
    };
  }, [combinations, ignoreTextInput, keyup, keydown]);
};

export default useKeyPress;
