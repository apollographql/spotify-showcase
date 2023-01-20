import { ComponentPropsWithoutRef } from 'react';
import cx from 'classnames';
import {
  getCoreRowModel,
  flexRender,
  useReactTable,
  ColumnDef,
  TableMeta,
  VisibilityState,
  Row,
} from '@tanstack/react-table';
import styles from './Table.module.scss';
import ContextMenu from './ContextMenu';

interface TableProps<TData>
  extends Omit<ComponentPropsWithoutRef<'table'>, 'children' | 'contextMenu'> {
  data: TData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  meta?: TableMeta<TData>;
  visibility?: VisibilityState;
  onDoubleClickRow?: (row: Row<TData>) => void;
  contextMenu?: (row: Row<TData>) => JSX.Element;
}

function Table<TData>({
  className,
  columns,
  data,
  meta,
  visibility,
  onDoubleClickRow,
  contextMenu,
  ...props
}: TableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    meta,
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
                  colSpan={header.colSpan}
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
        {table.getRowModel().rows.map((row) => {
          const tableRow = (
            <tr onDoubleClick={() => onDoubleClickRow?.(row)}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} data-wrap={cell.column.columnDef.meta?.wrap}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );

          if (contextMenu) {
            return (
              <ContextMenu key={row.id} content={contextMenu(row)}>
                {tableRow}
              </ContextMenu>
            );
          }

          return tableRow;
        })}
      </tbody>
    </table>
  );
}

export default Table;
