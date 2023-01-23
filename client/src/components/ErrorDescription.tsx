import { ReactNode } from 'react';

interface ErrorDescriptionProps {
  children: ReactNode;
}

const ErrorDescription = ({ children }: ErrorDescriptionProps) => {
  return <p className="mb-8 max-w-lg text-center text-lg">{children}</p>;
};

export default ErrorDescription;
