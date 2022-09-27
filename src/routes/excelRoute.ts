import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import ExcelParserService from "../services/excelParser";
import { Table } from "../types/table.types";

const excelRoute = async (fastify: FastifyInstance) => {

    fastify.post('/parse', async (
        request: FastifyRequest<{ Body: { table: Table; }; }>,
        reply: FastifyReply
    ) => {
        const table = request.body.table;
        const parsedTable = new ExcelParserService().parseTable(table);
        return parsedTable;
    });
};

export default excelRoute;