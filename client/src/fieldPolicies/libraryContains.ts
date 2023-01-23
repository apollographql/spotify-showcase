import { FieldPolicy } from '@apollo/client';

interface Storage {
  libraryContains?: Map<string, boolean>;
}

const lookup = (ids: string[], storage: Storage) => {
  const contains = storage.libraryContains ?? new Map<string, boolean>();
  const incomplete = ids.some((id) => contains.get(id) == null);

  if (incomplete) {
    return;
  }

  return ids.map((id) => contains.get(id));
};

const write = (ids: string[], incoming: boolean[], storage: Storage) => {
  const contains = storage.libraryContains ?? new Map<string, boolean>();

  const result = ids.reduce(
    (contains, id, index) => contains.set(id, incoming[index]),
    contains
  );

  storage.libraryContains = contains;

  return [...result.values()];
};

const libraryContains = (): FieldPolicy => {
  return {
    keyArgs: false,
    read(_: boolean[] = [], { args, storage }) {
      return lookup(args?.ids ?? [], storage);
    },
    merge: (
      existing: boolean[] = [],
      incoming: boolean[],
      { args, storage }
    ) => {
      if (!args) {
        return existing;
      }

      return write(args?.ids ?? [], incoming, storage);
    },
  };
};

export default libraryContains;
