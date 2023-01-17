import { FieldPolicy } from '@apollo/client';

const libraryContains = (): FieldPolicy => {
  return {
    keyArgs: false,
    read(existing: Record<string, boolean> = {}, { args }) {
      const ids = (args?.ids as string[]) ?? [];

      if (ids.some((id) => existing[id] == null)) {
        return;
      }

      return ids.map((id) => existing[id]);
    },
    merge: (
      existing: Record<string, boolean> = {},
      incoming: boolean[],
      { args }
    ) => {
      if (!args) {
        return existing;
      }

      return (args.ids as string[]).reduce(
        (memo, id, index) => ({ ...memo, [id]: incoming[index] }),
        existing
      );
    },
  };
};

export default libraryContains;
