import { ComponentPropsWithoutRef, useMemo, useRef, useState } from 'react';
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
import useKeyPress from '../hooks/useKeyPress';
import { range } from '../utils/common';
import useEventListener from '../hooks/useEventListener';

type RowSelectionType = 'single' | 'multi' | 'range';

interface TableProps<TData>
  extends Omit<ComponentPropsWithoutRef<'table'>, 'children' | 'contextMenu'> {
  data: TData[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[];
  meta?: TableMeta<TData>;
  visibility?: VisibilityState;
  onDoubleClickRow?: (rows: Row<TData>) => void;
  contextMenu?: (rows: Row<TData>[]) => JSX.Element;
  enableRowSelection?: boolean;
  enableMetaSelect?: boolean;
  enableShiftSelect?: boolean;
}

const useRowSelectionType = ({
  enableShiftSelect,
  enableMetaSelect,
}: {
  enableShiftSelect: boolean;
  enableMetaSelect: boolean;
}) => {
  const [rowSelectionType, setRowSelectionType] =
    useState<RowSelectionType>('single');

  const changeRowSelectionType =
    (selectionType: RowSelectionType) => (event: KeyboardEvent) => {
      if (event.type === 'keydown' && rowSelectionType === 'single') {
        return setRowSelectionType(selectionType);
      }

      if (event.type === 'keyup' && rowSelectionType === selectionType) {
        setRowSelectionType('single');
      }
    };

  useKeyPress('cmd', changeRowSelectionType('multi'), {
    active: enableMetaSelect,
    keyup: true,
  });

  useKeyPress('shift', changeRowSelectionType('range'), {
    active: enableShiftSelect,
    keyup: true,
  });

  useEventListener('visibilitychange', () => {
    if (document.hidden) {
      setRowSelectionType('single');
    }
  });

  useEventListener('blur', () => {
    setRowSelectionType('single');
  });

  return rowSelectionType;
};

function Table<TData>({
  className,
  columns,
  data,
  meta,
  visibility,
  onDoubleClickRow,
  contextMenu,
  enableRowSelection = false,
  enableMetaSelect = false,
  enableShiftSelect = false,
  ...props
}: TableProps<TData>) {
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [selectedRowStack, setSelectedRowStack] = useState<number[]>([]);
  const rowSelectionType = useRowSelectionType({
    enableMetaSelect,
    enableShiftSelect,
  });

  const table = useReactTable({
    data,
    columns,
    meta,
    state: {
      columnVisibility: visibility,
      rowSelection,
    },
    enableRowSelection,
    enableMultiRowSelection:
      rowSelectionType === 'multi' || rowSelectionType === 'range',
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  const selectedRows = useMemo(() => {
    return Object.entries(rowSelection)
      .filter(([, value]) => value)
      .map(([index]) => table.getRow(String(index)));
  }, [table, rowSelection]);

  const trackRowSelection = (row: Row<TData>) => {
    if (row.getIsSelected()) {
      return setSelectedRowStack((stack) => {
        return stack.filter((index) => row.index !== index);
      });
    }

    setSelectedRowStack((stack) => {
      switch (rowSelectionType) {
        case 'single':
          return [row.index];
        case 'multi':
        case 'range':
          return [row.index, ...stack];
      }
    });
  };

  const handleSelectRow = (row: Row<TData>) => {
    trackRowSelection(row);

    switch (rowSelectionType) {
      case 'single':
        return table.setRowSelection({ [row.index]: !row.getIsSelected() });
      case 'multi':
        return table.setRowSelection((old) => ({
          ...old,
          [row.index]: !row.getIsSelected(),
        }));
      case 'range': {
        const lower = selectedRowStack[0];
        const upper = row.index > lower ? row.index + 1 : row.index - 1;
        const rows = range(lower, upper).reduce(
          (memo, index) => ({ ...memo, [index]: true }),
          rowSelection
        );

        table.setRowSelection(rows);
      }
    }
  };

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
      <tbody className="before:block before:leading-4 before:content-['\200C']">
        {table.getRowModel().rows.map((row, index, rows) => {
          const isPreviousSelected =
            index !== 0 && rows[index - 1].getIsSelected();

          const isNextSelected =
            index !== rows.length - 1 && rows[index + 1].getIsSelected();

          const tableRow = (
            <tr
              data-state={row.getIsSelected() ? 'selected' : null}
              key={row.id}
              onClick={() => handleSelectRow(row)}
              onDoubleClick={() => onDoubleClickRow?.(row)}
              className={cx('group peer', {
                'bg-white/30': row.getIsSelected(),
                'select-none': rowSelectionType !== 'single',
              })}
              onContextMenu={() => {
                if (!row.getIsSelected()) {
                  handleSelectRow(row);
                }
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  data-wrap={cell.column.columnDef.meta?.wrap}
                  className={cx({
                    'first:rounded-tl': !isPreviousSelected,
                    'first:rounded-bl': !isNextSelected,
                    'last:rounded-tr': !isPreviousSelected,
                    'last:rounded-br': !isNextSelected,
                  })}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );

          if (contextMenu && selectedRows.length) {
            return (
              <ContextMenu key={row.id} content={contextMenu(selectedRows)}>
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
