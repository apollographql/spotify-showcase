import useAddToQueueMutation from '../../mutations/useAddToQueueMutation';
import { notify } from '../../notifications';
import ContextMenu from '../ContextMenu';

interface AddToQueueProps {
  uris: string[];
}

const AddToQueue = ({ uris }: AddToQueueProps) => {
  const [addToQueue] = useAddToQueueMutation();

  return (
    <ContextMenu.Action
      onSelect={async () => {
        try {
          await Promise.all(uris.map((uri) => addToQueue({ uri })));

          notify('Added to queue');
        } catch (e) {
          notify(
            `Could not add ${uris.length === 1 ? 'item' : 'items'} to queue`
          );
        }
      }}
    >
      Add to queue
    </ContextMenu.Action>
  );
};

export default AddToQueue;
