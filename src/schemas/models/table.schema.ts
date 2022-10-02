import {OpenAPIV3} from "openapi-types";

export const table: OpenAPIV3.SchemaObject = {
    type: "object",
    properties: {
        schema: {type: "array", items: {}},
        data: {type: "array", items: {}},
    }
};