import { ReactNode, MouseEvent } from 'react';
import Item from './Item';

interface ActionProps {
  disabled?: boolean;
  children?: ReactNode;
  onSelect?: () => void;
  onMouseOver?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Action = ({ children, disabled, onSelect, onMouseOver }: ActionProps) => {
  return (
    <Item disabled={disabled} onSelect={onSelect}>
      <button
        className="block w-full appearance-none text-left"
        onMouseOver={onMouseOver}
      >
        {children}
      </button>
    </Item>
  );
};

export default Action;
