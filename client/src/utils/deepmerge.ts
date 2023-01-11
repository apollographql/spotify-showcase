export function overwriteMerge<T1, T2>(target: T1[], source: T2[]): T2[];

export function overwriteMerge<T>(_target: T[], source: T[]) {
  return source;
}
