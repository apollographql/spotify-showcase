import useAddToQueueMutation from '../../mutations/useAddToQueueMutation';
import notificationManager from '../../notificationManager';
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

          notificationManager.add({ message: 'Added to queue' });
        } catch (e) {
          notificationManager.add({
            message: `Could not add ${
              uris.length === 1 ? 'item' : 'items'
            } to queue`,
          });
        }
      }}
    >
      Add to queue
    </ContextMenu.Action>
  );
};

export default AddToQueue;
