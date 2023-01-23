import { ReactNode } from 'react';

interface ErrorTitleProps {
  children: ReactNode;
}

const ErrorTitle = ({ children }: ErrorTitleProps) => {
  return <h1 className="mb-4 text-5xl">{children}</h1>;
};

export default ErrorTitle;
