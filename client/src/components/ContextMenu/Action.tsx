import { ReactNode } from 'react';
import Item from './Item';

interface ActionProps {
  disabled?: boolean;
  children?: ReactNode;
}

const Action = ({ children, disabled }: ActionProps) => {
  return (
    <Item disabled={disabled}>
      <button className="block w-full appearance-none text-left">
        {children}
      </button>
    </Item>
  );
};

export default Action;
