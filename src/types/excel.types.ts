import { Table } from "./table.types";

export type DataTypesToUse = string | Date | number | null;
export type ColumnParsingMap = Record<string, (value: any) => DataTypesToUse>;
export type DataSourcePayload = { table: Table, displayName: string, dashboardId: string; dataSourceId?: string; };