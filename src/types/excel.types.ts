import { Table } from "./table.types";

export type ColumnParsingMap = Record<string, (value: string) => string | Date | number>;
export type DataSource = { table: Table, displayName: string, dashboardId: string; };