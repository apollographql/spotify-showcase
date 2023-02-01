import { Children, ReactNode, ReactElement } from 'react';
import CodeBlock from '../CodeBlock';

interface PreProps {
  className?: string;
  children: ReactNode;
}

const Pre = ({ children }: PreProps) => {
  const { props } = Children.only(children) as ReactElement<{
    children: string;
    className?: string;
  }>;
  const language = props.className?.replace('language-', '');

  return <CodeBlock code={props.children} language={language} />;
};

export default Pre;
