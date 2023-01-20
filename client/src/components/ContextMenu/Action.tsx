import { ReactNode } from 'react';
import Item from './Item';

interface ActionProps {
  disabled?: boolean;
  children?: ReactNode;
  onSelect?: () => void;
}

const Action = ({ children, disabled, onSelect }: ActionProps) => {
  return (
    <Item disabled={disabled} onSelect={onSelect}>
      <button className="block w-full appearance-none text-left">
        {children}
      </button>
    </Item>
  );
};

export default Action;
