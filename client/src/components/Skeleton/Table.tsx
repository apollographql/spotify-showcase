import { ReactElement } from 'react';
import { randomBetween } from '../../utils/common';
import { range } from '../../utils/lists';
import styles from './Skeleton.module.scss';
import Text from './Text';

interface TableProps {
  rows: number;
  headers?: boolean;
  columns: number | ReactElement[];
}

const Table = ({
  headers = true,
  rows: rowCount,
  columns: columnConfig,
}: TableProps) => {
  const rows = range(0, rowCount);
  const columns =
    typeof columnConfig === 'number' ? range(0, columnConfig) : columnConfig;

  return (
    <table className={styles.skeleton__table}>
      {headers && (
        <thead>
          <tr>
            {columns.map((_, index) => (
              <th key={index} className={styles.skeleton__tableHeading}>
                <Text width={`${randomBetween(20, 60)}%`} />
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row) => (
          <tr key={row}>
            {columns.map((column, index) => (
              <td key={index} className={styles.skeleton__tableCell}>
                {typeof column === 'number' ? <Text /> : column}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
