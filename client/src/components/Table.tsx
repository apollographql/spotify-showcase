import { ComponentPropsWithoutRef } from 'react';
import cx from 'classnames';
import {
  getCoreRowModel,
  flexRender,
  useReactTable,
  ColumnDef,
  VisibilityState,
} from '@tanstack/react-table';
import styles from './Table.module.scss';

interface TableProps<TData>
  extends Omit<ComponentPropsWithoutRef<'table'>, 'children'> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  visibility?: VisibilityState;
}

function Table<TData>({
  className,
  columns,
  data,
  visibility,
  ...props
}: TableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: visibility,
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className={cx(styles.table, className)} {...props}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const { column } = header;

              return (
                <th
                  key={header.id}
                  data-shrink={column.columnDef.meta?.shrink}
                  data-align={column.columnDef.meta?.headerAlign}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
