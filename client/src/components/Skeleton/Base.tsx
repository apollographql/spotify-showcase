import { ElementType } from 'react';
import cx from 'classnames';
import { PolymorphicComponentProps } from '../../utils/types';

type BaseProps<TElement extends ElementType = 'div'> =
  PolymorphicComponentProps<TElement, { className: string }>;

function Base<TElement extends ElementType>({
  as,
  className,
  ...props
}: BaseProps<TElement>) {
  const Element = as || 'div';

  return (
    <Element
      {...props}
      className={cx(
        className,
        'opacity-50 bg-surface relative overflow-hidden rounded-2xl',
        'after:animate-shimmer after:absolute after:inset-0 after:translate-x-[-100%]',
        'after:[background-image:linear-gradient(90deg,rgba(55,55,55,0)_0,rgba(55,55,55,0.2)_20%,rgba(55,55,55,0.5)_60%,rgba(55,55,55,0))]'
      )}
    />
  );
}

export default Base;
