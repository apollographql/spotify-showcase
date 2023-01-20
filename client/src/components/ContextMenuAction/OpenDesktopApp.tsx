import ContextMenu from '../ContextMenu';

interface OpenDesktopAppProps {
  context?: Context;
  uri: string;
}

interface Context {
  uri: string;
}

const OpenDesktopApp = ({ uri, context }: OpenDesktopAppProps) => {
  const url = new URL(uri);

  if (context) {
    url.searchParams.set('context', context.uri);
  }

  return (
    <ContextMenu.Action onSelect={() => window.open(url, '_blank')}>
      Open in Desktop app
    </ContextMenu.Action>
  );
};

export default OpenDesktopApp;
