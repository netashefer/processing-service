import { FastifyInstance } from "fastify";
import { excelService } from "../../services/excelService";
import { DataSourcePayload } from "../../types/excel.types";
import { excelPostSchema } from "./schemas";

const excelRoute = async (fastify: FastifyInstance) => {

    fastify.post<{ Body: DataSourcePayload; }>('/addDataSource', { schema: excelPostSchema }, async (request, reply) => {
        const { table, displayName, dashboardId } = request.body;
        const parsedTable = excelService.parseTable(table);
        return excelService.addDataSource({ displayName, dashboardId, table: parsedTable });
    });

    fastify.get('/getDataTable/:id', {}, async (request, reply) => {
        // just for now, in the future it will be part of Execute request
        const { id } = request.params as any;
        const parsedTable = await excelService.getDataBySourceId(id);
        return parsedTable;
    });
};

export default excelRoute;