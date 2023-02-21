import { Link } from 'react-router-dom';
import { List } from 'lucide-react';
import PlaybarControlButton from './PlaybarControlButton';

const QueueControlButton = () => {
  return (
    <Link to="/queue" className="block leading-none">
      <PlaybarControlButton
        disallowed={false}
        icon={<List strokeWidth={1.5} />}
        tooltip="Queue"
      />
    </Link>
  );
};

export default QueueControlButton;
