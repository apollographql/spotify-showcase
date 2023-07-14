import Switch from './Switch';
import { persistedQueryModeVar } from '../vars';
import { useReactiveVar } from '@apollo/client';
import SettingsField from './SettingsField';

const AppSettingsForm = () => {
  const persistedQueryMode = useReactiveVar(persistedQueryModeVar);

  return (
    <SettingsField
      title="Persisted Query Mode"
      description="Run queries as persisted queries"
      control={
        <Switch checked={persistedQueryMode} onChange={persistedQueryModeVar} />
      }
    />
  );
};

export default AppSettingsForm;
