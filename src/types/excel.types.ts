import { Table } from "./table.types";

export type ColumnParsingMap = Record<string, (value: string) => string | Date | number | null>;
export type DataSourcePayload = { table: Table, displayName: string, dashboardId: string; dataSourceId?: string; };