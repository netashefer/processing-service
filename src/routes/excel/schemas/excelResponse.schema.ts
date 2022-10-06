import { OpenAPIV3 } from "openapi-types";
import { table } from "../../../schemas/models/table.schema";

export const excelResponse: OpenAPIV3.ResponseObject = {
    description: "The request succeeded",
    ...table
    //todo: add dataSoucreId
};