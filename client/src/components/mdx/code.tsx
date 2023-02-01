/* eslint-disable @typescript-eslint/no-explicit-any */
import cx from 'classnames';
import Highlight, { Language, PrismTheme } from 'prism-react-renderer';
import Prism from 'prismjs';

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
      language={language as Language}
      theme={theme}
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

const COLORS = {
  BG: '#121212',
  FG: '#b3b3b3',
  WHITE: '#FFFFFF',
  SELECTION: '#44475A',
  COMMENT: '#5d6a7f',
  CYAN: '#8BE9FD',
  GREEN: '#50fa7b',
  ORANGE: '#FFB86C',
  PINK: '#FF79C6',
  PURPLE: '#BD93F9',
  RED: '#FF5555',
  YELLOW: '#F1FA8C',
  BLACK: '#121212',
  NBLACK: '#3c3c3c',
  MEDBLACK: '#212121',
  SOFTBLACK: '#535353',
  GRAY: '#b3b3b3',
  DARKGREEN: '#1aa64b',
};

const theme: PrismTheme = {
  plain: {
    color: COLORS.WHITE,
    backgroundColor: COLORS.MEDBLACK,
  },
  styles: [
    {
      types: ['comment', 'block-comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: COLORS.COMMENT,
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: COLORS.WHITE,
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: [
        'property',
        'tag',
        'constant',
        'symbol',
        'deleted',
        'keyword',
        'operator',
      ],
      style: {
        color: COLORS.PINK,
      },
    },
    {
      types: ['boolean', 'number'],
      style: {
        color: COLORS.PURPLE,
      },
    },
    {
      types: ['selector', 'attr-name', 'string', 'char', 'inserted'],
      style: {
        color: COLORS.YELLOW,
      },
    },
    {
      types: ['builtin'],
      style: {
        color: COLORS.CYAN,
      },
    },
    {
      types: ['at-rule', 'attr-value', 'function'],
      style: { color: COLORS.GREEN },
    },
    { types: ['regex', 'important'], style: { color: COLORS.ORANGE } },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['bold', 'important'],
      style: { fontWeight: 'bold' },
    },
  ],
};

export default Code;
