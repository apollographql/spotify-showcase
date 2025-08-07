import Switch from './Switch';
import { persistedQueryModeVar, highlightSuspenseBoundariesVar } from '../vars';
import { useReactiveVar } from "@apollo/client/react";
import SettingsField from './SettingsField';

const AppSettingsForm = () => {
  const persistedQueryMode = useReactiveVar(persistedQueryModeVar);
  const highlightSuspenseBoundaries = useReactiveVar(
    highlightSuspenseBoundariesVar
  );

  return (
    <div className="flex flex-col gap-4">
      <SettingsField
        title="Persisted Query Mode"
        description="Run queries as persisted queries"
        control={
          <Switch
            checked={persistedQueryMode}
            onChange={persistedQueryModeVar}
          />
        }
      />
      <SettingsField
        title="Highlight Suspense Boundaries"
        description="Display a red border around React suspense boundaries to indicate loading states"
        control={
          <Switch
            checked={highlightSuspenseBoundaries}
            onChange={highlightSuspenseBoundariesVar}
          />
        }
      />
    </div>
  );
};

export default AppSettingsForm;
