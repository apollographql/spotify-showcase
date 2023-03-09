import {
  ComponentPropsWithoutRef,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react';
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
  contextMenu?: (rows: Row<TData>[]) => ReactNode;
  enableRowSelection?: boolean;
  enableMultiSelect?: boolean;
  enableRangeSelect?: boolean;
}

const useRowSelectionType = ({
  multiSelect,
  rangeSelect,
}: {
  multiSelect: boolean;
  rangeSelect: boolean;
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
    active: rangeSelect,
    keyup: true,
  });

  useKeyPress('shift', changeRowSelectionType('range'), {
    active: multiSelect,
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
  enableMultiSelect = false,
  enableRangeSelect = false,
  ...props
}: TableProps<TData>) {
  const tableRef = useRef<HTMLTableElement>(null);
  const [selectedRowStack, setSelectedRowStack] = useState<number[]>([]);
  const rowSelectionType = useRowSelectionType({
    rangeSelect: enableRangeSelect,
    multiSelect: enableMultiSelect,
  });

  const table = useReactTable({
    data,
    columns,
    meta,
    state: {
      columnVisibility: visibility,
    },
    enableRowSelection,
    enableMultiRowSelection: enableMultiSelect || enableRangeSelect,
    getCoreRowModel: getCoreRowModel(),
  });

  useEventListener('click', (event) => {
    if (!tableRef.current?.contains(event.target as Node)) {
      table.toggleAllRowsSelected(false);
    }
  });

  const { rowSelection } = table.getState();

  const selectedRows = useMemo(() => {
    return Object.entries(rowSelection)
      .filter(([, value]) => value)
      .map(([index]) => table.getRow(String(index)));
  }, [table, rowSelection]);

  const trackRowSelection = (row: Row<TData>) => {
    setSelectedRowStack((stack) => {
      if (row.getIsSelected()) {
        return stack.filter((index) => row.index !== index);
      }

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
    if (!enableRowSelection) {
      return;
    }

    trackRowSelection(row);

    switch (rowSelectionType) {
      case 'single':
        table.setRowSelection({ [row.index]: !row.getIsSelected() });

        break;
      case 'multi':
        if (enableMultiSelect) {
          table.setRowSelection((old) => ({
            ...old,
            [row.index]: !row.getIsSelected(),
          }));
        }

        break;
      case 'range': {
        if (enableRangeSelect) {
          const lower = selectedRowStack[0];
          const upper = row.index > lower ? row.index + 1 : row.index - 1;
          const rows = range(lower, upper).reduce(
            (memo, index) => ({ ...memo, [index]: true }),
            rowSelection
          );

          table.setRowSelection(rows);
        }
      }
    }
  };

  const hasVisibleHeaders = table
    .getHeaderGroups()
    .some((headerGroup) =>
      headerGroup.headers.some((header) => header.column.columnDef.header)
    );

  return (
    <table
      ref={tableRef}
      className={cx('border-collapse text-sm relative w-full', className)}
      {...props}
    >
      {hasVisibleHeaders && (
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="my-0 -mx-4 py-0 px-4" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const { column } = header;
                const { headerAlign } = column.columnDef.meta ?? {};

                return (
                  <th
                    key={header.id}
                    className={cx(
                      'text-muted text-xs font-normal tracking-widest uppercase whitespace-nowrap',
                      'border-b border-solid border-primary',
                      'p-2',
                      'first:pl-4 last:pr-4 [&>svg]:inline-block',
                      {
                        'text-left':
                          headerAlign === 'left' || headerAlign == null,
                        'text-center': headerAlign === 'center',
                        'text-right': headerAlign === 'right',
                      }
                    )}
                    colSpan={header.colSpan}
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
      )}
      <tbody className="before:block before:leading-4 before:content-['\200C']">
        {table.getRowModel().rows.map((row, index, rows) => {
          const isPreviousSelected =
            index !== 0 && rows[index - 1].getIsSelected();

          const isNextSelected =
            index !== rows.length - 1 && rows[index + 1].getIsSelected();

          const tableRow = (
            <tr
              key={row.id}
              onClick={() => handleSelectRow(row)}
              onDoubleClick={() => onDoubleClickRow?.(row)}
              className={cx('group peer my-0 -mx-4 py-0 px-4', {
                '[&>td]:hover:bg-surface-active': !row.getIsSelected(),
                'bg-white/30': row.getIsSelected(),
                'select-none': rowSelectionType !== 'single',
              })}
              onContextMenu={() => {
                if (!row.getIsSelected()) {
                  handleSelectRow(row);
                }
              }}
            >
              {row.getVisibleCells().map((cell) => {
                const { meta } = cell.column.columnDef;

                return (
                  <td
                    key={cell.id}
                    className={cx('py-3 px-2 text-left first:pl-4 last:pr-4', {
                      'w-px': meta?.shrink,
                      'whitespace-nowrap': !meta?.wrap,
                      'first:rounded-tl': !isPreviousSelected,
                      'first:rounded-bl': !isNextSelected,
                      'last:rounded-tr': !isPreviousSelected,
                      'last:rounded-br': !isNextSelected,
                    })}
                    style={{ width: meta?.columnWidth }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );

          if (contextMenu) {
            return (
              <ContextMenu
                key={row.id}
                disabled={!enableRowSelection}
                content={selectedRows.length ? contextMenu(selectedRows) : null}
              >
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
