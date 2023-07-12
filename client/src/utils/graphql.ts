import { __TypeKind } from '../types/api';

interface SchemaType {
  name: string | null;
  kind: __TypeKind;
  ofType?: SchemaType | null;
}

export const toSDL = (type: SchemaType): string => {
  switch (type.kind) {
    case __TypeKind.NonNull:
      return `${toSDL(type.ofType!)}!`;
    case __TypeKind.List:
      return `[${toSDL(type.ofType!)}]`;
    default:
      return type.name ?? '';
  }
};
