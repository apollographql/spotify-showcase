import * as _Switch from '@radix-ui/react-switch';

interface SwitchProps {
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  checked: boolean;
}

const Switch = ({ disabled, onChange, checked }: SwitchProps) => {
  return (
    <_Switch.Root
      disabled={disabled}
      checked={checked}
      onCheckedChange={onChange}
      className="relative bg-surface data-checked:bg-green w-[46px] h-[25px] rounded-full p-0.5 transition-colors"
    >
      <_Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform will-change-transform data-checked:translate-x-full" />
    </_Switch.Root>
  );
};

export default Switch;
