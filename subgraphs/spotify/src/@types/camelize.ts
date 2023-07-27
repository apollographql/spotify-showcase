/* eslint-disable @typescript-eslint/ban-types */
declare module 'camelize' {
  type CamelCase<S extends string> =
    S extends `${infer P1}_${infer P2}${infer P3}`
      ? `${P1}${Uppercase<P2>}${CamelCase<P3>}`
      : S;

  export type Camelize<T> = {
    [K in keyof T as CamelCase<string & K>]: T[K] extends Array<infer U>
      ? U extends {} | undefined
        ? Array<Camelize<U>>
        : T[K]
      : T[K] extends {} | undefined
      ? Camelize<T[K]>
      : T[K];
  };

  export default function camelize<T>(
    obj: T
  ): T extends string ? string : Camelize<T>;
}
