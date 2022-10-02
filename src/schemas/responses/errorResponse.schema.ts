import {OpenAPIV3} from "openapi-types";
import { error } from "../models/error.schema";

export const errorResponse: OpenAPIV3.ResponseObject = {
    description: "An error occurred",
    ...error
}