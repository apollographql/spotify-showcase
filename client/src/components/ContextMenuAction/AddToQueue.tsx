import useAddToQueueMutation from '../../mutations/useAddToQueueMutation';
import ContextMenu from '../ContextMenu';

interface AddToQueueProps {
  uri: string;
}

const AddToQueue = ({ uri }: AddToQueueProps) => {
  const [addToQueue] = useAddToQueueMutation();

  return (
    <ContextMenu.Action onSelect={() => addToQueue({ uri })}>
      Add to queue
    </ContextMenu.Action>
  );
};

export default AddToQueue;
