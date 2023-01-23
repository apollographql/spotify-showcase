import { ReactNode } from 'react';
import { To, Link } from 'react-router-dom';
import Button from './Button';

interface ErrorActionLinkProps {
  children: ReactNode;
  to: To;
}

const ErrorActionLink = ({ children, to }: ErrorActionLinkProps) => {
  return (
    <Button as={Link} to={to} variant="secondary">
      {children}
    </Button>
  );
};

export default ErrorActionLink;
