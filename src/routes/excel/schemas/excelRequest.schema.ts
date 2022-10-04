import { OpenAPIV3 } from "openapi-types";
import { excelFile } from "../../../schemas/models/excelFile.schema";
import { table } from "../../../schemas/models/table.schema";

export const excelRequestBody: OpenAPIV3.SchemaObject = {
    type: "object",
    properties: {
        table
    },
    required: ["table"]
};

export const excelFileRequestBody: OpenAPIV3.SchemaObject = {
    type: "object",
    properties: {
        excelFile
    },
    required: ["file"]
};