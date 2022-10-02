import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ExcelParserService from "../../services/excelParser";
import { Table } from "../../types/table.types";
import { excelPostSchema } from "./schemas";

const excelRoute = async (fastify: FastifyInstance) => {

    fastify.post<{Body: {table: Table}}>('/parse', {schema: excelPostSchema}, async (request, reply) => {
        const table = request.body.table;
        const parsedTable = new ExcelParserService().parseTable(table);
        return parsedTable;
    });
};

export default excelRoute;