import { FastifySchema } from "fastify";
import { errorResponse } from "../../../schemas/responses/errorResponse.schema";
import { excelRequestBody } from "./excelRequest.schema";
import { excelResponse } from "./excelResponse.schema";

const excelTags = ["excel"];

export const excelPostSchema: FastifySchema = {
    summary: 'Parse excel file',
    description: 'Parse a given excel file',
    operationId: 'postExcel',
    body: excelRequestBody,
    response: {
        200: excelResponse,
        default: errorResponse
    },
    tags: excelTags
}