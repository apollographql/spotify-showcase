import { ReactNode } from 'react';
import Item from './Item';

interface ActionProps {
  disabled?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

const Action = ({ children, disabled, onClick }: ActionProps) => {
  return (
    <Item disabled={disabled}>
      <button
        className="block w-full appearance-none text-left"
        onClick={onClick}
      >
        {children}
      </button>
    </Item>
  );
};

export default Action;
