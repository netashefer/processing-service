import { OpenAPIV3 } from "openapi-types";

export const error: OpenAPIV3.SchemaObject = {
    type: "object",
    properties: {
        message: { type: "string" },
        type: { type: "string" },
        stack: { type: "string" },
    },
    required: ["message"]
}