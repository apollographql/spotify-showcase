import { useRef, DependencyList } from 'react';
import { equal } from '@wry/equality';

const useDeepMemo = <TValue>(memoFn: () => TValue, deps: DependencyList) => {
  const ref = useRef<{ deps: DependencyList; value: TValue }>();

  if (!ref.current || !equal(ref.current.deps, deps)) {
    ref.current = { value: memoFn(), deps };
  }

  return ref.current.value;
};

export default useDeepMemo;
