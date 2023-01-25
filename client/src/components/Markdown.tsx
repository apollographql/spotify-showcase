import ReactMarkdown from 'react-markdown';
import cx from 'classnames';

interface MarkdownProps {
  className?: string;
  children: string;
  title?: string;
}

const Markdown = ({ className, children, title }: MarkdownProps) => {
  return (
    <div className={cx('markdown', className)} title={title}>
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  );
};

export default Markdown;
