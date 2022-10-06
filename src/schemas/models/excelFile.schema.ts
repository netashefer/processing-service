import { OpenAPIV3 } from "openapi-types";
import { table } from './table.schema';

export const excelDataSource: OpenAPIV3.SchemaObject = {
    type: "object",
    properties: {
        table,
        displayName: { type: "string" },
        dashboardId: { type: "string" },
    }
};

export const dataSourceId: OpenAPIV3.SchemaObject = {
    type: "string",
};