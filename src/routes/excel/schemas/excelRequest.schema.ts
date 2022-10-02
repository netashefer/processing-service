import {OpenAPIV3} from "openapi-types";
import { table } from "../../../schemas/models/table.schema";

export const excelRequestBody: OpenAPIV3.SchemaObject = {
    type: "object",
    properties: {
        table
    },
    required: ["table"]
}