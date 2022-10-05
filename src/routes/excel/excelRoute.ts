import { FastifyInstance } from "fastify";
import { excelService } from "../../services/excelService";
import { DataSource } from "../../types/excel.types";
import { excelPostSchema } from "./schemas";

const excelRoute = async (fastify: FastifyInstance) => {

    fastify.post<{ Body: DataSource; }>('/add', { schema: excelPostSchema }, async (request, reply) => {
        const { table, displayName, dashboardId } = request.body;
        const parsedTable = excelService.parseTable(table);

        // @ts-ignore - todo: make type of fastify.db.client
        return excelService.addDataSource(fastify.db.client, { displayName, dashboardId, table: parsedTable });
    });
};

export default excelRoute;