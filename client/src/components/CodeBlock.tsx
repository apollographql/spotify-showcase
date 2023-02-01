/* eslint-disable @typescript-eslint/no-explicit-any */
import cx from 'classnames';
import Highlight, { Language } from 'prism-react-renderer';
import Prism from 'prismjs';
import 'prism-themes/themes/prism-dracula.css';
import '../prism/prism-dracula-overrides.scss';

interface CodeBlockProps {
  language: string | undefined;
  code: string;
}

const CodeBlock = ({ language, code }: CodeBlockProps) => {
  if (['javascript', 'js'].includes(language ?? '')) {
    language = 'jsx';
  }

  return (
    <Highlight
      Prism={Prism as any}
      code={code.trim()}
      language={language as Language}
    >
      {({ className, getLineProps, getTokenProps, tokens }) => (
        <pre
          className={cx(
            className,
            'max-h-[400px] rounded border border-white/5 text-sm'
          )}
        >
          <code>
            {tokens.map((line, index) => (
              <div
                key={index}
                {...getLineProps({ line, key: index, className: 'flex gap-4' })}
              >
                <div className="w-[2ch] select-none text-right opacity-50">
                  {index + 1}
                </div>
                <div>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
