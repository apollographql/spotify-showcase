import { useLocation, Link } from 'react-router-dom';
import { List } from 'lucide-react';
import PlaybarControlButton from './PlaybarControlButton';

const QueueControlButton = () => {
  const location = useLocation();
  const href = location.pathname === '/queue' ? location.state.from : '/queue';

  return (
    <Link
      to={href}
      state={href === '/queue' ? { from: location.pathname } : null}
      className="block leading-none"
    >
      <PlaybarControlButton
        active={location.pathname === '/queue'}
        disallowed={false}
        icon={<List strokeWidth={1.5} />}
        tooltip="Queue"
      />
    </Link>
  );
};

export default QueueControlButton;
