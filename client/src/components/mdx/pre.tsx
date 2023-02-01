import { ReactNode } from 'react';

interface PreProps {
  children: ReactNode;
}

const Pre = ({ children }: PreProps) => children;

export default Pre;
