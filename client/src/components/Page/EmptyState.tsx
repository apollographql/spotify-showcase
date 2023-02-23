import { cloneElement, ReactElement } from 'react';
import cx from 'classnames';
import { LucideProps } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactElement<LucideProps>;
  title: string;
  description: string;
}

const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center gap-2">
      {icon &&
        cloneElement(icon, {
          className: cx(icon.props.className, 'text-muted'),
          size: '5rem',
        })}
      <h1 className="mb-0">{title}</h1>
      <p className="text-muted">{description}</p>
    </div>
  );
};

export default EmptyState;
