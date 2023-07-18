import { useEffect } from 'react';

interface Options {
  async?: boolean;
}

const useScript = (src: string, options: Options = {}) => {
  useEffect(() => {
    if (document.querySelector(`script[src='${src}]`)) {
      return;
    }

    const script = document.createElement('script');
    script.src = src;

    if (options.async) {
      script.async = true;
    }

    document.body.appendChild(script);
  }, [src, options.async]);
};

export default useScript;
