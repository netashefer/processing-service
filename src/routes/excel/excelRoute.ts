import { FastifyInstance } from "fastify";
import ExcelService from "../../services/excelService";
import { DataSource } from "../../types/excel.types";
import { excelPostSchema } from "./schemas";

const excelRoute = async (fastify: FastifyInstance) => {

    fastify.post<{ Body: DataSource; }>('/add', { schema: excelPostSchema }, async (request, reply) => {
        const { table, displayName, dashboardId } = request.body;
        const parsedTable = new ExcelService().parseTable(table);

        // @ts-ignore - todo: make type of fastify.db.client
        const dataSourceId = new ExcelService().addDataSource(fastify.db.client, { displayName, dashboardId, table: parsedTable });
        return dataSourceId;
    });
};

export default excelRoute;