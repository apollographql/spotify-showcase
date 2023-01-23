import { FieldPolicy } from '@apollo/client';

const libraryContains = (): FieldPolicy => {
  return {
    keyArgs: false,
    read(_: boolean[] = [], { args, storage }) {
      storage.libraryContains =
        storage.libraryContains ?? new Map<string, boolean>();

      const ids = (args?.ids as string[]) ?? [];
      const incomplete = ids.some(
        (id) => storage.libraryContains.get(id) == null
      );

      if (incomplete) {
        return;
      }

      return ids.map((id) => storage.libraryContains.get(id));
    },
    merge: (
      existing: boolean[] = [],
      incoming: boolean[],
      { args, storage }
    ) => {
      if (!args) {
        return existing;
      }

      storage.libraryContains =
        storage.libraryContains ?? new Map<string, boolean>();

      const result = (args.ids as string[]).reduce(
        (contains, id, index) => contains.set(id, incoming[index]),
        storage.libraryContains as Map<string, boolean>
      );

      return [...result.values()];
    },
  };
};

export default libraryContains;
