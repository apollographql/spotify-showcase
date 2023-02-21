import { CSSProperties } from 'react';
import '@tanstack/react-table';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    headerAlign?: 'left' | 'center' | 'right';
    shrink?: boolean;
    wrap?: boolean;
    columnWidth?: CSSProperties['width'];
  }

  interface TableMeta<TData extends RowData> {
    [key: string]: unknown;
  }
}
