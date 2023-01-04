import {
  Children,
  CSSProperties,
  ReactElement,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  MutableRefObject,
} from 'react';

interface FitTextProps {
  children: ReactElement<{
    style: CSSProperties;
    ref: MutableRefObject<unknown>;
  }>;
  minFontSize?: number;
  maxFontSize?: number;
}

const FitText = ({
  children,
  minFontSize = Number.NEGATIVE_INFINITY,
  maxFontSize = Number.POSITIVE_INFINITY,
}: FitTextProps) => {
  const [entry, setEntry] = useState<ResizeObserverEntry>();
  const ref = useRef<HTMLElement>();
  const child = Children.only(children);
  const element = ref.current;

  useEffect(() => {
    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      setEntry(entry);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [element]);

  const fontSize = useMemo(() => {
    if (!entry) {
      return;
    }

    return Math.min(
      Math.max(entry.contentRect.width / 10, minFontSize),
      maxFontSize
    );
  }, [minFontSize, maxFontSize, entry]);

  console.log({ entry, fontSize });

  return cloneElement(child, {
    ref,
    style: { ...child.props.style, fontSize },
  });
};

export default FitText;
