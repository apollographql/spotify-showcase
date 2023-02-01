/* eslint-disable @typescript-eslint/no-explicit-any */
import cx from 'classnames';
import Highlight, { Language } from 'prism-react-renderer';
import Prism from 'prismjs';
import 'prism-themes/themes/prism-dracula.css';
import '../../prism/prism-dracula-overrides.scss';

interface MDXCodeBlockProps {
  className: string;
  children: string;
}

const Code = ({ className, children }: MDXCodeBlockProps) => {
  const language = className.replace('language-', '');

  return (
    <Highlight
      Prism={Prism as any}
      code={children.trim()}
      language={language === 'javascript' ? 'jsx' : (language as Language)}
    >
      {({ className, getLineProps, getTokenProps, tokens }) => (
        <pre className={cx(className, 'bg-surface-active rounded p-4')}>
          <code>
            {tokens.map((line, index) => (
              <div key={index} {...getLineProps({ line, key: index })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
