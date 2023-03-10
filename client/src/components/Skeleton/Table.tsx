import { ReactElement } from 'react';
import { randomBetween } from '../../utils/common';
import { range } from '../../utils/lists';
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
    <table className="border-collapse w-full">
      {headers && (
        <thead>
          <tr>
            {columns.map((_, index) => (
              <th
                key={index}
                className="text-xs py-3 px-2 border-b border-solid border-primary"
              >
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
              <td key={index} className="text-sm py-4 px-2">
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
