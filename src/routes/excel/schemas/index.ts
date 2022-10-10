import { FastifySchema } from "fastify";
import { errorResponse } from "../../../schemas/responses/errorResponse.schema";
import { excelReplaceRequestBody, excelRequestBody } from "./excelRequest.schema";
import { excelResponse } from "./excelResponse.schema";

const excelTags = ["excel"];

export const excelPostSchema: FastifySchema = {
    summary: 'add excel data source',
    description: 'add excel data source',
    operationId: 'postExcel',
    body: excelRequestBody,
    response: {
        200: excelResponse,
        default: errorResponse
    },
    tags: excelTags
};

export const excelPutSchema: FastifySchema = {
    summary: 'replace excel data source',
    description: 'replace excel data source',
    operationId: 'putExcel',
    body: excelReplaceRequestBody,
    response: {
        200: excelResponse,
        default: errorResponse
    },
    tags: excelTags
};