import Button, { ButtonProps } from './Button';

type ForwardedProps = Omit<
  ButtonProps<'button'>,
  'variant' | 'as' | 'children'
>;

type PlayButtonProps = ForwardedProps & {
  playing: boolean;
};

const PlayButton = ({ playing, ...props }: PlayButtonProps) => {
  return (
    <Button {...props} variant="primary">
      {playing ? 'Pause' : 'Play'}
    </Button>
  );
};

export default PlayButton;
