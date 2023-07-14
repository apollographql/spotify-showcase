import { ReactElement } from 'react';

interface SettingsFieldProps {
  title: string;
  description: string;
  control: ReactElement;
}

const SettingsField = ({ title, description, control }: SettingsFieldProps) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg">{title}</h3>
      <div className="flex items-center">
        <p className="flex-1 text-muted">{description}</p>
        {control}
      </div>
    </div>
  );
};

export default SettingsField;
