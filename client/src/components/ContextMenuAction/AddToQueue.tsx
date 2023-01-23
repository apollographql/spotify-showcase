import useAddToQueueMutation from '../../mutations/useAddToQueueMutation';
import { notify } from '../../notifications';
import ContextMenu from '../ContextMenu';

type AddToQueueProps =
  | { uri: string; uris?: never }
  | { uri?: never; uris: string[] };

const AddToQueue = ({ uri, uris }: AddToQueueProps) => {
  const allUris = uris || [uri];
  const [addToQueue] = useAddToQueueMutation();

  return (
    <ContextMenu.Action
      onSelect={async () => {
        try {
          await Promise.all(allUris.map((uri) => addToQueue({ uri })));

          notify('Added to queue');
        } catch (e) {
          notify(
            `Could not add ${allUris.length === 1 ? 'item' : 'items'} to queue`
          );
        }
      }}
    >
      Add to queue
    </ContextMenu.Action>
  );
};

export default AddToQueue;
