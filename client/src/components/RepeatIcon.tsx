import { RepeatMode } from '../types/api';
import { LucideProps, Repeat, Repeat1 } from 'lucide-react';

interface RepeatIconProps extends LucideProps {
  repeatState: RepeatMode;
}

const RepeatIcon = ({ repeatState, ...props }: RepeatIconProps) => {
  switch (repeatState) {
    case RepeatMode.Context:
      return <Repeat {...props} />;
    case RepeatMode.Off:
      return <Repeat {...props} />;
    case RepeatMode.Track:
      return <Repeat1 {...props} />;
  }
};

export default RepeatIcon;
